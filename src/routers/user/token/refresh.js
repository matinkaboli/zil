import { Router } from 'express';

import logged from 'Root/middlewares/auth/logged';

const router = new Router();

router.post('/user/token/refresh', logged, async (req, res) => {
  res.json({ statusCode: 200 });
});

export default router;
