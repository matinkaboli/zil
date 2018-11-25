import { Router } from 'express';

import User from 'Root/models/User';
import Attempt from 'Root/models/Attempt';
import logged from 'Root/middlewares/auth/logged';

const router = new Router();

router.delete('/users', logged, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        entity: 'users',
        description: 'User not found.',
      });
    }

    const attempt = await Attempt.findOne({ user: user._id });

    if (attempt) {
      attempt.remove();
    }

    await user.remove();

    return res.status(200).json({
      description: 'User has been deleted successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
