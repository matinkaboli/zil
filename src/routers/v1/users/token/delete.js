import { Router } from 'express';

import Token from 'Root/models/Token';
import logged from 'Root/middlewares/auth/logged';

const router = new Router();

router.delete('v1/users/tokens', logged, async (req, res) => {
  try {
    const token = await Token.findOne({ token: req.headers.authorization });

    await token.remove();

    return res.status(204).json({
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
