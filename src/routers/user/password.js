import { Router } from 'express';

import otp from 'Root/utils/otp';
import jwt from 'Root/utils/jwt';
import hmac from 'Root/utils/hmac';
import User from 'Root/models/User';
import { hashKey } from 'Root/config';
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
  {
    value: 'password',
    required: true,
  },
);

router.post('/user/password', login, reqs, async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.body.phone });

    if (!user) {
      return res.json({
        entity: 'user',
        statusCode: 404,
        description: 'User not found.',
      });
    }

    if (!otp.verify(req.body.code)) {
      return res.json({
        entity: 'code',
        statusCode: 498,
        description: 'Code is invalid.',
      });
    }

    if (hmac(req.body.password, hashKey) !== user.password) {
      return res.json({
        statusCode: 401,
        entity: 'password',
        description: 'Password is incorrect.',
      });
    }

    return res.json({
      statusCode: 200,
      description: 'Password is correct.',
      token: await jwt.sign({ _id: user._id }),
    });
  } catch (error) {
    return res.json({
      statusCode: 520,
      error: error.message,
      description: 'Unrecognizable error happened',
    });
  }
});

export default router;
