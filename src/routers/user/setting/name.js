import { Router } from 'express';

import User from 'Root/models/User';
import logged from 'Root/middlewares/auth/logged';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements({
  value: 'name',
  required: true,
});

router.post('/user/setting/name', logged, reqs, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.json({
        entity: 'user',
        statusCode: 404,
        description: 'User not found',
      });
    }

    user.name = req.body.name;

    await user.save();

    return res.json({
      statusCode: 200,
      description: 'User\' name has been changed successfully.',
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
