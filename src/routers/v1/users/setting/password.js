import { Router } from 'express';

import hmac from 'Root/utils/hmac';
import User from 'Root/models/User';
import { hashKey } from 'Root/config';
import logged from 'Root/middlewares/auth/logged';
import validatePassword from 'Root/utils/validate/password';
import requirements from 'Root/middlewares/requirements/body';

const router = new Router();

const reqs = requirements(
  {
    value: 'newPassword',
    required: true,
  },
  {
    value: 'oldPassword',
    required: true,
  },
);

router.patch('/v1/users/password', logged, reqs, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        entity: 'users',
        description: 'User not found.',
      });
    }

    if (hmac(req.body.oldPassword, hashKey) !== user.password) {
      return res.status(400).json({
        entity: 'oldPassword',
        description: 'Old password is incorrect.',
      });
    }

    if (!validatePassword(req.body.newPassword)) {
      return res.status(400).json({
        entity: 'newPassword',
        description: 'Password is invalid',
      });
    }

    user.password = hmac(req.body.newPassword, hashKey);

    await user.save();

    return res.status(200).json({
      description: 'User\'s password has been changed successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
