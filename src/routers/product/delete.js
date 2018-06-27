import { Router } from 'express';

import Product from 'Root/models/Product';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements({
  type: 'id',
  required: true,
});

router.post('/product/delete', reqs, async (req, res) => {
  try {
    const product = await Product.findById(req.body.id);

    if (!product) {
      return res.json({ statusCode: 404, entity: 'product' });
    }

    await product.remove();

    return res.json({ type: 200 });
  } catch (error) {
    return res.json({ statusCode: 520, error });
  }
});

export default router;
