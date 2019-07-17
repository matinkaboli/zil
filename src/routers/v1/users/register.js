import { Router } from 'express';

import jwt from 'Root/utils/jwt';
import hmac from 'Root/utils/hmac';
import User from 'Root/models/User';
import { hashKey } from 'Root/config';
import random from 'Root/utils/random';
import login from 'Root/middlewares/auth/login';
import validateEmail from 'Root/utils/validate/email';
import validatePassword from 'Root/utils/validate/password';
import requirements from 'Root/middlewares/requirements/body';

const router = new Router();

const reqs = requirements(
  {
    value: 'email',
    required: true,
  },
  {
    value: 'password',
    required: true,
  },
);

router.post('/v1/users', login, reqs, async (req, res) => {
  try {
    if (!validateEmail(req.body.email)) {
      return res.status(400).json({
        entity: 'email',
        description: 'Email is invalid.',
      });
    }

    if (!validatePassword(req.body.password)) {
      return res.status(400).json({
        entity: 'password',
        description: 'Password is invalid',
      });
    }

    const checkEmail = await User.findOne({ email: req.body.email.toLowerCase() });

    if (checkEmail !== null) {
      return res.status(401).json({
        entity: 'email',
        description: 'Email is already taken',
      });
    }

    const randomHash = await random(15);

    const user = new User({
      apiKey: randomHash,
      email: req.body.email,
      password: hmac(req.body.password, hashKey),
    });

    await user.save();

    return res.status(200).json({
      data: {
        apiKey: randomHash,
        email: req.body.email,
        balance: user.balance,
        token: await jwt.sign({ _id: user._id }),
      },
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
});

export default router;
