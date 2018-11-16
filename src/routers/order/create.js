import { Router } from 'express';

import Shop from 'Root/models/Shop';
import pushe from 'Root/utils/pushe';
import Order from 'Root/models/Order';
import Follow from 'Root/models/Follow';
import Showcase from 'Root/models/Showcase';
import OrderList from 'Root/models/OrderList';
import pusheTypes from 'Root/utils/pushe/types';
import logged from 'Root/middlewares/auth/logged';
import { pushe as pusheConfig } from 'Root/config';
import requirements from 'Root/middlewares/requirements';
import { body as pusheBodyTemplate } from 'Root/utils/pushe/config';

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

      if (!i.showcase) {
        return res.status(417).json({
          requirement: 'showcase',
          description: 'The server needs parameter *showcase* to be sent from the client.',
        });
      }

      const showcase = await Showcase.findById(i.showcase);

      if (!showcase) {
        return res.json(404).json({
          _id: i.showcase,
          entity: 'showcase',
          description: 'Showcase not found.',
        });
      }

      const orderList = new OrderList({
        count: i.count,
        order: order._id,
        showcase: i.showcase,
        price: showcase.discountedPrice ? showcase.discountedPrice : showcase.price,
      });

      await orderList.save();
    }

    const pendingOrders = await Order.find({
      shop: req.body._id,
      status: { $in: ['approved', 'submitted', 'cancelled'] },
    });

    const pusheBody = {
      ...pusheBodyTemplate,
      data: {
        delay_while_idle: false,
      },
      filter: {
        pushe_id: [shop.admin.pusheId],
      },
      notification: {
        led_on: 500,
        visibility: true,
        wake_screen: true,
        title: 'سفارش جدید',
        led_color: '-16711936',
        notif_icon: 'shopping basket',
        content: `${pendingOrders.length} سفارش برای فروشگاه شما وجود دارد.`,
      },
      custom_content: {
        shopId: shop._id,
        orderId: order._id,
        type: pusheTypes.order.submitted,
      },
    };

    pushe(pusheBody)
      .then((data) => {
        console.log(data);
      })
      .catch(() => {
      });

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
