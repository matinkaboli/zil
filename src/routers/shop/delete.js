import { Router } from 'express';

import Shop from 'Root/models/Shop';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements({
  value: '_id',
  required: true,
});

router.post('/shop/delete', reqs, async (req, res) => {
  try {
    const shop = await Shop.findById(req.body._id);

    if (!shop) {
      return res.json({
        entity: 'shop',
        statusCode: 404,
        description: 'Shop not found',
      });
    }

    await shop.remove();

    return res.json({
      statusCode: 200,
      description: 'Shop has been deleted successfully.',
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
