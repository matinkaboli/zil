import { Router } from 'express';

import Order from 'Root/models/Order';
import pushe from 'Root/utils/pushe';
import pusheTypes from 'Root/utils/pushe/types';
import logged from 'Root/middlewares/auth/logged';
import bodyRequirements from 'Root/middlewares/requirements/body';
import { body as pusheBodyTemplate } from 'Root/utils/pushe/config';

const router = new Router();

const reqs = bodyRequirements({
  value: 'status',
  required: true,
});

router.patch('v1/shops/:shopId/orders/:orderId/status', logged, reqs, async (req, res) => {
  try {
    const order = await Order
      .findOne({ admin: req.user, _id: req.params.orderId })
      .populate('user')
      .exec();

    if (!order) {
      return res.status(404).json({
        entity: 'orders',
        description: 'Order not found.',
      });
    }

    let title;
    let content;
    let ledColor;
    let notifIcon;
    let pusheType;
    let wakeScreen;

    if (req.body.status === 'sent') {
      content = '';
      wakeScreen = false;
      ledColor = '-8206336';
      title = 'سفارش شما ارسال شد';
      notifIcon = 'open in browser';
      pusheType = pusheTypes.order.sent;
    } else if (req.body.status === 'approved') {
      content = '';
      wakeScreen = false;
      notifIcon = 'check box';
      title = 'سفارش شما تایید شد';
      pusheType = pusheTypes.order.approved;
    } else if (req.body.status === 'cancelled') {
      wakeScreen = true;
      ledColor = '-65536';
      content = 'reason why';
      title = 'سفارش شما لغو شد';
      notifIcon = 'highlight off';
      pusheType = pusheTypes.order.cancelled;
    } else if (req.body.status === 'delivered') {
      content = '';
      wakeScreen = true;
      notifIcon = 'thumbup';
      ledColor = '-16711681';
      pusheType = pusheTypes.order.delivered;
      title = 'سفارش شما با موفقیت تحویل داده شد';
    } else {
      return res.status(400).json({
        entity: 'status',
        description: 'Status is not valid.',
      });
    }

    order.status = req.body.status;

    await order.save();


    const pusheBody = {
      ...pusheBodyTemplate,
      data: {
        delay_while_idle: false,
      },
      filter: {
        pushe_id: [order.user.pusheId],
      },
      notification: {
        title,
        content,
        visibility: true,
        led_color: ledColor,
        notif_icon: notifIcon,
        wake_screen: wakeScreen,
        led_on: ledColor ? 500 : 0,
      },
      custom_content: {
        type: pusheType,
        shopId: order.shop,
        orderId: order._id,
      },
    };

    pushe(pusheBody).catch(() => {});

    return res.status(200).json({
      description: 'The status of the order has been changed successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
