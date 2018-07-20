import { Router } from 'express';

import Shop from 'Root/models/Shop';
import Showcase from 'Root/models/Showcase';
import logged from 'Root/middlewares/auth/logged';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements({
  value: '_id',
  required: true,
});

router.post('/shop/showcase/delete', logged, reqs, async (req, res) => {
  try {
    const shop = await Shop.findOne({ admin: req.user });

    if (!shop) {
      return res.json({
        entity: 'shop',
        statusCode: 404,
        description: 'Shop not found.',
      });
    }

    const showcase = await Showcase.findById({
      shop: shop._id,
      _id: req.body._id,
    });

    if (!showcase) {
      return res.json({
        statusCode: 404,
        entity: 'showcase',
        description: 'Showcase not found.',
      });
    }

    await showcase.remove();

    return res.json({
      statusCode: 200,
      description: 'Showcase has been deleted successfully.',
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
