import { Router } from 'express';

import hmac from 'Root/utils/hmac';
import User from 'Root/models/User';
import { hashKey } from 'Root/config';
import logged from 'Root/middlewares/auth/logged';
import bodyRequirements from 'Root/middlewares/requirements/body';

const router = new Router();

const bodyReqs = bodyRequirements(
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

router.patch('v1/users/setting/password', logged, bodyReqs, async (req, res) => {
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
        return res.status(400).json({
          entity: 'oldPassword',
          description: 'Old password is incorrect.',
        });
      }
    }

    user.password = hmac(req.body.newPassword, hashKey);

    if (req.body.passwordHint) {
      user.passwordHint = req.body.passwordHint;
    }

    await user.save();

    return res.status(204).json({
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
