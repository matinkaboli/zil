import { Router } from 'express';

import User from 'Root/models/User';
import logged from 'Root/middlewares/auth/logged';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements({
  value: 'phone',
  required: true,
});

router.post('/user/token/check', logged, reqs, async (req, res) => {
  const user = await User.findOne({ phone: req.body.phone });

  if (!user) {
    return res.json({
      entity: 'user',
      statusCode: 404,
      description: 'User not found.',
    });
  }

  if (user._id !== req.user) {
    return res.json({
      entity: 'user',
      statusCode: 401,
      description: 'You do not have the right token.',
    });
  }

  return res.json({
    statusCode: 200,
    description: 'JWT token is correct.',
  });
});

export default router;
