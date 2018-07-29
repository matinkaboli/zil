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
    value: 'code',
    required: true,
  },
  {
    value: 'phone',
    required: true,
  },
);

router.post('/user/login', login, reqs, async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.body.phone });

    if (!user) {
      return res.status(404).json({
        entity: 'user',
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
      return res.status(429).json({
        description: 'Too many requests to log in. Wait for 1 hour.',
      });
    }

    if (!otp.verify(req.body.code)) {
      return res.status(498).json({
        entity: 'code',
        description: 'Code is invalid.',
      });
    }

    const response = {
      password: !!user.password,
      description: 'Code is valid.',
    };

    if (!user.password) {
      response.token = await jwt.sign({ _id: user._id });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
