import { Router } from 'express';

import User from 'Root/models/User';
import logged from 'Root/middlewares/auth/logged';

const router = new Router();

router.post('/user/delete', logged, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.json({
        entity: 'user',
        statusCode: 404,
        description: 'User not found',
      });
    }

    await user.remove();

    return res.json({
      statusCode: 200,
      description: 'User has been deleted successfully.',
    });
  } catch (error) {
    return res.json({
      error,
      statusCode: 520,
      description: 'Unrecognizable error happened',
    });
  }
});

export default router;
