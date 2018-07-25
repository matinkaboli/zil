import { Router } from 'express';

import hmac from 'Root/utils/hmac';
import User from 'Root/models/User';
import { hashKey } from 'Root/config';
import logged from 'Root/middlewares/auth/logged';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements({
  value: 'password',
  required: true,
});

router.post('/user/password', logged, reqs, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.json({
        entity: 'user',
        statusCode: 404,
        description: 'User not found.',
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
