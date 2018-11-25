import { Router } from 'express';

import Shop from 'Root/models/Shop';
import Follow from 'Root/models/Follow';
import logged from 'Root/middlewares/auth/logged';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements({
  value: '_id',
  required: true,
});

router.post('/shop/follow/delete', logged, reqs, async (req, res) => {
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
      shop: shop._id,
    });

    if (!follow) {
      return res.status(404).json({
        entity: 'follow',
        description: 'Follow not found.',
      });
    }

    shop.followersCount -= 1;

    shop.save();
    await follow.remove();

    return res.status(200).json({
      description: 'User unfollowed the shop.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
