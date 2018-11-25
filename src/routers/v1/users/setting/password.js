import { Router } from 'express';

import hmac from 'Root/utils/hmac';
import User from 'Root/models/User';
import { hashKey } from 'Root/config';
import logged from 'Root/middlewares/auth/logged';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements(
  {
    value: 'newPassword',
    required: true,
  },
  {
    value: 'oldPassword',
    required: false,
  },
  {
    value: 'passwordHint',
    required: false,
  },
);

router.patch('/users/setting/password', logged, reqs, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        entity: 'users',
        description: 'User not found.',
      });
    }

    if (user.password) {
      if (!req.body.oldPassword) {
        return res.status(417).json({
          requirement: 'oldPassword',
          description: 'The server needs a value named *oldPassword* but the client did not send it.',
        });
      }

      if (hmac(req.body.oldPassword, hashKey) !== user.password) {
        return res.status(401).json({
          entity: 'oldPassword',
          description: 'Old password does not match.',
        });
      }
    }

    user.password = hmac(req.body.newPassword, hashKey);

    if (req.body.passwordHint) {
      user.passwordHint = req.body.passwordHint;
    }

    await user.save();

    return res.status(200).json({
      description: 'User\'s password has been changed successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
