import { Router } from 'express';

import Shop from 'Root/models/Shop';
import Showcase from 'Root/models/Showcase';
import logged from 'Root/middlewares/auth/logged';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements(
  {
    value: 'shopId',
    required: true,
  },
  {
    value: 'showcaseId',
    required: true,
  },
);

router.post('/shop/showcase/delete', logged, reqs, async (req, res) => {
  try {
    const shop = await Shop.findOne({
      admin: req.user,
      _id: req.body.shopId,
    });

    if (!shop) {
      return res.status(404).json({
        entity: 'shop',
        description: 'Shop not found.',
      });
    }

    const showcase = await Showcase.findById({
      shop: shop._id,
      _id: req.body.showcaseId,
    });

    if (!showcase) {
      return res.status(404).json({
        entity: 'showcase',
        description: 'Showcase not found.',
      });
    }

    await showcase.remove();

    shop.showcaseCount -= 1;

    shop.save();

    return res.status(200).json({
      description: 'Showcase has been deleted successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
