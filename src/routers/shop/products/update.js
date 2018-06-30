import { Router } from 'express';

import ProductInShop from 'Root/models/ProductInShop';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements(
  {
    value: '_id',
    required: true,
  },
  {
    value: 'realPrice',
    required: false,
  },
  {
    value: 'discountedPrice',
    required: true,
  },
);

router.post('/shop/product/update', reqs, async (req, res) => {
  try {
    const productInShop = await ProductInShop.findById(req.body._id);

    if (!productInShop) {
      return res.json({ statusCode: 404, entity: 'productInShop' });
    }

    const values = ['realPrice', 'discountedPrice'];

    for (const value of values) {
      productInShop[value] = req.body[value] || productInShop[value] || '';
    }

    await productInShop.save();

    return res.json({ statusCode: 200 });
  } catch (error) {
    return res.json({ statusCode: 520, error });
  }
});

export default router;
