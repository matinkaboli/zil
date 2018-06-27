import { Router } from 'express';

import Product from 'Root/models/Product';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements(
  {
    value: 'id',
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
    const product = await Product.findById(req.body.id);

    if (!product) {
      return res.json({ statusCode: 404, entity: 'product' });
    }

    for (const key of Object.keys(product)) {
      product[key] = req.body[key] || product[key] || '';
    }

    await product.save();

    return res.json({ statusCode: 200 });
  } catch (error) {
    return res.json({ statusCode: 520, error });
  }
});

export default router;
