import { Router } from 'express';

import otp from 'Root/utils/otp';
import jwt from 'Root/utils/jwt';
import hmac from 'Root/utils/hmac';
import User from 'Root/models/User';
import { hashKey } from 'Root/config';
import login from 'Root/middlewares/auth/login';
import bodyRequirements from 'Root/middlewares/requirements/body';

const router = new Router();

const bodyReqs = bodyRequirements(
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

router.post('/v1/users/password', login, bodyReqs, async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.body.phone });

    if (!user) {
      return res.status(404).json({
        entity: 'users',
        description: 'User not found.',
      });
    }

    if (!otp.verify(req.body.code)) {
      return res.status(400).json({
        entity: 'codes',
        description: 'Code is invalid.',
      });
    }

    if (hmac(req.body.password, hashKey) !== user.password) {
      return res.status(400).json({
        entity: 'passwords',
        description: 'Password is incorrect.',
      });
    }

    return res.status(200).json({
      description: 'Password is correct.',
      token: await jwt.sign({ _id: user._id }),
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
