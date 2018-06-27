import { Router } from 'express';

import Product from 'Root/models/Product';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements(
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

router.post('/product/create', reqs, async (req, res) => {
  const productValues = {
    name: req.body.name,
  };

  const optionalValues = ['isbn', 'expiration', 'manufacturer', 'description'];

  for (const optionalValue of optionalValues) {
    if (req.body[optionalValue]) {
      productValues[optionalValue] = req.body[optionalValue];
    }
  }

  const product = new Product(productValues);

  try {
    await product.save();

    return res.json({ statusCode: 200 });
  } catch (error) {
    return res.json({ statusCode: 520, error });
  }
});

export default router;
