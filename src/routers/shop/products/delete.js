import { Router } from 'express';

import ProductInShop from 'Root/models/ProductInShop';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements({
  value: '_id',
  required: true,
});

router.post('/shop/product/delete', reqs, async (req, res) => {
  try {
    const productInShop = await ProductInShop.findById(req.body._id);

    if (!productInShop) {
      return res.json({ statusCode: 404, entity: 'productInShop' });
    }

    await productInShop.remove();

    return res.json({ statusCode: 200 });
  } catch (error) {
    return res.json({ statusCode: 520, error });
  }
});

export default router;
