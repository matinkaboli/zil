import { Router } from 'express';

import jwt from 'Root/utils/jwt';
import hmac from 'Root/utils/hmac';
import User from 'Root/models/User';
import { hashKey } from 'Root/config';
import login from 'Root/middlewares/auth/login';
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

router.post('/v1/users/login', login, reqs, async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email.toLowerCase(),
      password: hmac(req.body.password, hashKey),
    });

    if (!user) {
      return res.status(404).json({
        entity: 'user',
        description: 'User not found.',
      });
    }

    return res.status(200).json({
      data: {
        email: user.email,
        apiKey: user.apiKey,
        balance: user.balance,
        token: await jwt.sign({ _id: user._id }),
      },
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
