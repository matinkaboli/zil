import { Router } from 'express';

import User from 'Root/models/User';
import logged from 'Root/middlewares/auth/logged';
import bodyRequirements from 'Root/middlewares/requirements/body';

const router = new Router();

const bodyReqs = bodyRequirements({
  value: 'phone',
  required: true,
});

router.post('v1/users/tokens/check', logged, bodyReqs, async (req, res) => {
  const user = await User.findOne({ phone: req.body.phone });

  if (!user) {
    return res.status(404).json({
      entity: 'users',
      description: 'User not found.',
    });
  }

  if (user._id.toString() !== req.user) {
    return res.status(401).json({
      entity: 'users',
      description: 'You do not have the right token.',
    });
  }

  return res.status(200).json({
    _id: user._id,
    description: 'JWT token is correct.',
  });
});

export default router;
