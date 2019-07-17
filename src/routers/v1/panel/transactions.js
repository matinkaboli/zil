import { Router } from 'express';

import Payment from 'Root/models/Payment';
import logged from 'Root/middlewares/auth/logged';

const router = new Router();

router.get('/v1/panel/transactions', logged, async (req, res) => {
  try {
    const payments = await Payment
      .find({ user: req.user })
      .exec();

    return res.status(200).json({
      data: payments,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
});

export default router;
