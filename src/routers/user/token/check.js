import { Router } from 'express';

import logged from 'Root/middlewares/auth/logged';

const router = new Router();

router.post('/user/token/check', logged, async (req, res) =>
  res.json({
    statusCode: 200,
    description: 'JWT token is correct.',
  }));

export default router;
