import { Router } from 'express';

import Shop from 'Root/models/Shop';
import Showcase from 'Root/models/Showcase';
import logged from 'Root/middlewares/auth/logged';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements(
  {
    value: 'shop_id',
    required: true,
  },
  {
    value: 'showcase_id',
    required: true,
  },
  {
    value: 'price',
    required: true,
  },
  {
    value: 'discountedPrice',
    required: false,
  },
);

router.post('/shop/showcase/update', logged, reqs, async (req, res) => {
  try {
    const shop = await Shop.findOne({
      admin: req.user,
      _id: req.body.shop_id,
    });

    if (!shop) {
      return res.json({
        entity: 'shop',
        statusCode: 404,
        description: 'Shop not found.',
      });
    }

    const showcase = await Showcase.findById({
      shop: shop._id,
      _id: req.body.showcase_id,
    });

    if (!showcase) {
      return res.json({
        statusCode: 404,
        entity: 'showcase',
        description: 'Showcase not found.',
      });
    }

    if (req.body.price) {
      showcase.price = req.body.price;
    }

    if (req.body.discountedPrice) {
      showcase.discountedPrice = req.body.discountedPrice;
    }

    await showcase.save();

    return res.json({
      statusCode: 200,
      description: 'Showcase has been updated successfully.',
    });
  } catch (error) {
    return res.json({
      statusCode: 520,
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
