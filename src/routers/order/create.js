import { Router } from 'express';

import Shop from 'Root/models/Shop';
import pushe from 'Root/utils/pushe';
import Order from 'Root/models/Order';
import Follow from 'Root/models/Follow';
import OrderList from 'Root/models/OrderList';
import logged from 'Root/middlewares/auth/logged';
import { body as pusheBodyTemplate } from 'Root/utils/pushe/config';
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
    value: 'items',
    required: true,
  },
  {
    value: 'address',
    required: true,
  },
);

router.post('/order/create', logged, reqs, async (req, res) => {
  try {
    const shop = await Shop.findById(req.body._id).populate('admin').exec();

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
      user: req.user,
      shop: req.body._id,
      status: 'submitted',
      admin: shop.admin._id,
      delivery: {
        lat: req.body.lat,
        lng: req.body.lng,
        time: req.body.time,
        address: req.body.address,
      },
    });

    await order.save();

    const { items } = JSON.parse(req.body.items);

    for (const i of items) {
      if (!i.count || Number.isNaN(i.count)) {
        return res.status(417).json({
          requirement: 'count',
          description: 'The server needs parameter *count* to be sent from the client.',
        });
      }

      if (!i.price || Number.isNaN(i.price)) {
        return res.status(417).json({
          requirement: 'price',
          description: 'The server needs parameter *price* to be sent from the client.',
        });
      }

      if (!i.showcase) {
        return res.status(417).json({
          requirement: 'showcase',
          description: 'The server needs parameter *showcase* to be sent from the client.',
        });
      }

      const orderList = new OrderList({
        count: i.count,
        price: i.price,
        order: order._id,
        showcase: i.showcase,
      });

      await orderList.save();
    }

    const pusheBody = {
      ...pusheBodyTemplate,
      filter: {
        pushe_id: [shop.admin.pusheId],
      },
      notification: {
        title: 'New order',
        content: 'You have a new order.',
      },
    };

    pushe(pusheBody).catch(() => {});

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
