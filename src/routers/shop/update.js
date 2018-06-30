import { Router } from 'express';

import Shop from 'Root/models/Shop';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements(
  {
    value: '_id',
    required: true,
  },
  {
    value: 'lat',
    required: true,
  },
  {
    value: 'lng',
    required: true,
  },
  {
    value: 'name',
    required: true,
  },
  {
    value: 'address',
    required: true,
  },
  {
    value: 'description',
    required: false,
  },
);

router.post('/shop/update', reqs, async (req, res) => {
  try {
    const shop = await Shop.findById(req.body._id);

    if (!shop) {
      return res.json({ statusCode: 404, entity: 'shop' });
    }

    const values = ['lng', 'lat', 'name', 'address', 'description'];


    for (const value of values) {
      shop[value] = req.body[value] || shop[value] || '';
    }

    await shop.save();

    return res.json({ statusCode: 200 });
  } catch (error) {
    return res.json({ statusCode: 520, error });
  }
});

export default router;
