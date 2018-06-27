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

  if (req.body.manufacturer) {
    productValues.manufacturer = req.body.manufacturer;
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
