import { Router } from 'express';

import Order from 'Root/models/Order';
import logged from 'Root/middlewares/auth/logged';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements({
  value: '_id',
  required: true,
});

router.post('/order/cancel', logged, reqs, async (req, res) => {
  try {
    const order = await Order.findById(req.body._id);

    if (!order) {
      return res.status(404).json({
        entity: 'order',
        description: 'Order not found.',
      });
    }

    order.status = 3;

    await order.save();

    return res.status(200).json({
      description: 'Order has been canceled successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
