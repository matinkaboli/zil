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
        entity: 'shops',
        description: 'Shop not found.',
      });
    }

    const hasFollowed = await Follow.findOne({
      user: req.user,
      shop: shop._id,
    });

    if (hasFollowed) {
      return res.status(200).json({
        description: 'User has already followed the shop.',
      });
    }

    const follow = new Follow({
      user: req.user,
      shop: shop._id,
    });

    shop.followersCount += 1;

    await shop.save();
    await follow.save();

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
