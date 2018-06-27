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
);

router.post('/product/add', reqs, async (req, res) => {
  const productValues = {
    name: req.body.name,
  };

  if (req.body.isbn) {
    productValues.isbn = req.body.isbn;
  }

  if (req.body.expiration) {
    productValues.expiration = req.body.expiration;
  }

  const product = new Product(productValues);

  try {
    await product.save();

    return res.json({ statusCode: 200 });
  } catch (error) {
    return res.json({ type: 400, error });
  }
});

export default router;
