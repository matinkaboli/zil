import { Router } from 'express';

import jwt from 'Root/utils/jwt';
import User from 'Root/models/User';
import Code from 'Root/models/Code';
import Attempt from 'Root/models/Attempt';
import login from 'Root/middlewares/auth/login';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements(
  {
    value: 'phone',
    required: true,
  },
  {
    value: 'code',
    required: true,
  },
);

router.post('/user/login', login, reqs, async (req, res) => {
  const user = await User.findOne({ phone: req.body.phone });

  if (!user) {
    return res.json({
      entity: 'user',
      statusCode: 404,
      description: 'User not found.',
    });
  }

  const code = await Code.findOne({ user: user._id });

  if (!code) {
    return res.json({
      entity: 'code',
      statusCode: 404,
      description: 'Code not found.',
    });
  }

  let attempt = await Attempt.findOne({ user: user._id });

  if (!attempt) {
    attempt = new Attempt({
      user: user._id,
    });

    await attempt.save();
  }

  attempt.attempts += 1;

  attempt.save();

  if (attempt.attempts > 10) {
    return res.json({
      statusCode: 429,
      description: 'Too many requests to log in. Wait for 1 hour.',
    });
  }

  if (req.body.code !== code.code) {
    return res.json({
      entity: 'code',
      statusCode: 498,
      description: 'Code is not valid.',
    });
  }

  code.remove();

  return res.json({
    statusCode: 200,
    token: jwt.sign({ _id: user._id }),
    description: 'User has been successfully logged in.',
  });
});

export default router;
