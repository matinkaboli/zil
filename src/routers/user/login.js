import { Router } from 'express';

import otp from 'Root/utils/otp';
import jwt from 'Root/utils/jwt';
import User from 'Root/models/User';
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
  try {
    const user = await User.findOne({ phone: req.body.phone });

    if (!user) {
      return res.json({
        entity: 'user',
        statusCode: 404,
        description: 'User not found.',
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

    if (!otp.verify(req.body.code)) {
      return res.json({
        entity: 'code',
        statusCode: 498,
        description: 'Code is invalid.',
      });
    }

    const response = {
      statusCode: 200,
      description: 'Code is valid.',
    };

    if (user.password) {
      response.password = true;
    } else {
      response.token = await jwt.sign({ _id: user._id });
    }

    return res.json(response);
  } catch (error) {
    return res.json({
      statusCode: 520,
      error: error.message,
      description: 'Unrecognizable error happened',
    });
  }
});

export default router;
