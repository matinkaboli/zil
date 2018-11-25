import { Router } from 'express';

import User from 'Root/models/User';
import logged from 'Root/middlewares/auth/logged';

const router = new Router();

router.post('/users/:userPhone/tokens/check', logged, async (req, res) => {
  const user = await User.findOne({ phone: req.params.userPhone });

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
