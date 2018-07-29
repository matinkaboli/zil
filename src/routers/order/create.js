import { Router } from 'express';

import Shop from 'Root/models/Shop';
import Order from 'Root/models/Order';
import Follow from 'Root/models/Follow';
import logged from 'Root/middlewares/auth/logged';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements(
  {
    value: '_id',
    required: true,
  },
  {
    value: 'lat',
    required: true,
  },
  {
    value: 'lng',
    required: true,
  },
  {
    value: 'time',
    required: true,
  },
  {
    value: 'address',
    required: true,
  },
);

router.post('/order/create', logged, reqs, async (req, res) => {
  try {
    const shop = await Shop.findById(req.body._id);

    if (!shop) {
      return res.status(404).json({
        entity: 'shop',
        description: 'Shop not found.',
      });
    }

    const follow = await Follow.findOne({
      user: req.user,
      shop: req.body._id,
    });

    if (!follow) {
      return res.status(403).json({
        entity: 'follow',
        description: 'User must follow the shop in order to make an order.',
      });
    }

    const order = new Order({
      status: 0,
      user: req.user,
      shop: req.body._id,
      delivery: {
        lat: req.body.lat,
        lng: req.body.lng,
        time: req.body.time,
        address: req.body.address,
      },
    });

    await order.save();

    return res.status(201).json({
      description: 'Order has been created successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
