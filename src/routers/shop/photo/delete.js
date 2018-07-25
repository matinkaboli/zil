import { Router } from 'express';

import Shop from 'Root/models/Shop';
import logged from 'Root/middlewares/auth/logged';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements(
  {
    value: 'photo',
    required: true,
  },
  {
    value: 'shopId',
    required: true,
  },
);

router.post('/shop/photo/delete', logged, reqs, async (req, res) => {
  try {
    const shop = await Shop.findOne({
      admin: req.user,
      _id: req.body.shopId,
    });

    if (!shop) {
      return res.json({
        entity: 'shop',
        statusCode: 404,
        description: 'Shop not found.',
      });
    }

    if (!shop.includes(req.body.photo)) {
      return res.json({
        entity: 'photo',
        statusCode: 404,
        description: 'Photo not found',
      });
    }

    shop.photos = shop.photos.filter(v => v !== req.body.photo);

    await shop.save();

    return res.json({
      statusCode: 200,
      description: 'Photo has been deleted successfully.',
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
