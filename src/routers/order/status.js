import { Router } from 'express';

import Order from 'Root/models/Order';
import logged from 'Root/middlewares/auth/logged';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements(
  {
    value: '_id',
    required: true,
  },
  {
    value: 'status',
    required: true,
  },
);

router.post('/order/status', logged, reqs, async (req, res) => {
  try {
    const order = await Order.findOne({
      user: req.user,
      _id: req.body._id,
    });

    if (!order) {
      return res.status(404).json({
        entity: 'order',
        description: 'Order not found.',
      });
    }

    order.status = req.body.status;

    await order.save();

    return res.status(200).json({
      description: 'The status of order has been changed successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
