import { Router } from 'express';

import Shop from 'Root/models/Shop';
import Follow from 'Root/models/Follow';
import logged from 'Root/middlewares/auth/logged';

const router = new Router();

router.post('/shops/:id/follow', logged, async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);

    if (!shop) {
      return res.status(404).json({
        entity: 'shop',
        description: 'Shop not found.',
      });
    }

    let follow = await Follow.findOne({
      user: req.user,
      shop: shop._id,
    });

    if (!follow) {
      follow = new Follow({
        user: req.user,
        shop: shop._id,
      });

      shop.followersCount += 1;

      shop.save();
      await follow.save();
    }

    return res.status(201).json({
      description: 'User followed the shop.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
