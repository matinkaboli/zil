import { Router } from 'express';

import Product from 'Root/models/Product';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements(
  {
    value: '_id',
    required: true,
  },
  {
    value: 'name',
    required: true,
  },
  {
    value: 'isbn',
    required: false,
  },
  {
    value: 'expiration',
    required: false,
  },
  {
    value: 'manufacturer',
    required: false,
  },
  {
    value: 'description',
    required: false,
  },
);

router.post('/product/update', reqs, async (req, res) => {
  try {
    const product = await Product.findById(req.body._id);

    if (!product) {
      return res.json({
        statusCode: 404,
        entity: 'product',
        description: 'Product not found.',
      });
    }

    const values = [
      'name',
      'isbn',
      'expiration',
      'description',
      'manufacturer',
    ];

    for (const value of values) {
      product[value] = req.body[value] || values[value] || '';
    }

    await product.save();

    return res.json({
      statusCode: 200,
      description: 'Product has been updated successfully.',
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
