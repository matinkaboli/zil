import { Router } from 'express';

import Showcase from 'Root/models/Showcase';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements({
  value: '_id',
  required: true,
});

router.post('/shop/showcase/delete', reqs, async (req, res) => {
  try {
    const showcase = await Showcase.findById(req.body._id);

    if (!showcase) {
      return res.json({
        statusCode: 404,
        entity: 'productInShop',
        description: 'Product in shop not found.',
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
