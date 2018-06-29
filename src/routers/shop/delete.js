import { Router } from 'express';

import Shop from 'Root/models/Shop';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements({
  value: '_id',
  required: true,
});

router.post('/shop/delete', reqs, async (req, res) => {
  try {
    const shop = await Shop.findById(req.body._id);

    if (!shop) {
      return res.json({ statusCode: 404, entity: 'shop' });
    }

    await shop.remove();

    return res.json({ type: 200 });
  } catch (error) {
    return res.json({ statusCode: 520, error });
  }
});

export default router;
