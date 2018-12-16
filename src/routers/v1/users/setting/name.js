import { Router } from 'express';

import User from 'Root/models/User';
import logged from 'Root/middlewares/auth/logged';
import bodyRequirements from 'Root/middlewares/requirements/body';

const router = new Router();

const bodyReqs = bodyRequirements({
  value: 'name',
  required: true,
});

router.patch('v1/users/settings/name', logged, bodyReqs, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        entity: 'users',
        description: 'User not found.',
      });
    }

    user.name = req.body.name;

    await user.save();

    return res.status(200).json({
      description: 'User\' name has been changed successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
