import { Router } from 'express';

import Token from 'Root/models/Token';
import logged from 'Root/middlewares/auth/logged';

const router = new Router();

router.post('/user/token/delete', logged, async (req, res) => {
  try {
    const token = await Token.findOne({ token: req.headers['x-access-header'] });

    await token.remove();

    return res.json({
      statusCode: 200,
      description: 'JWT token has been deleted successfully.',
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
