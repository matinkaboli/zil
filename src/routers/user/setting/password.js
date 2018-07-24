import { Router } from 'express';

import hmac from 'Root/utils/hmac';
import User from 'Root/models/User';
import { hashKey } from 'Root/config';
import logged from 'Root/middlewares/auth/logged';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements(
  {
    value: 'new_password',
    required: true,
  },
  {
    value: 'old_password',
    required: false,
  },
  {
    value: 'password_hint',
    required: false,
  },
);

router.post('/user/setting/password', logged, reqs, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.json({
        entity: 'user',
        statusCode: 404,
        description: 'User not found.',
      });
    }

    if (user.password) {
      if (!req.body.old_password) {
        return res.json({
          statusCode: 417,
          requirement: 'old_password',
          description: 'The server needs a value named *old_password* but the client did not send it.',
        });
      }

      if (hmac(req.body.old_password, hashKey) !== user.password) {
        return res.json({
          statusCode: 401,
          entity: 'old_password',
          description: 'Old password does not match.',
        });
      }
    }

    user.password = hmac(req.body.new_password, hashKey);

    if (req.body.password_hint) {
      user.passwordHint = req.body.password_hint;
    }

    await user.save();

    return res.json({
      statusCode: 200,
      description: 'User\'s password has been changed successfully.',
    });
  } catch (error) {
    return res.json({
      statusCode: 520,
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
