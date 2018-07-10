import { Router } from 'express';

import Product from 'Root/models/Product';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements({
  type: '_id',
  required: true,
});

router.post('/product/delete', reqs, async (req, res) => {
  try {
    const product = await Product.findById(req.body._id);

    if (!product) {
      return res.json({
        statusCode: 404,
        entity: 'product',
        description: 'Product not found.',
      });
    }

    await product.remove();

    return res.json({
      statusCode: 200,
      description: 'The product has been deleted successfully.',
    });
  } catch (error) {
    return res.json({
      error,
      statusCode: 520,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
