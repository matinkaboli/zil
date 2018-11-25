import { Router } from 'express';

import Token from 'Root/models/Token';
import logged from 'Root/middlewares/auth/logged';

const router = new Router();

router.delete('/users/tokens', logged, async (req, res) => {
  try {
    const token = await Token.findOne({ token: req.headers['x-access-token'] });

    await token.remove();

    return res.status(200).json({
      description: 'JWT token has been deleted successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
