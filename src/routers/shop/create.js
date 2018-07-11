import { Router } from 'express';

import Shop from 'Root/models/Shop';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements(
  {
    value: 'name',
    required: true,
  },
  {
    value: 'description',
    required: false,
  },
  {
    value: 'address',
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
);

router.post('/shop/create', reqs, async (req, res) => {
  const shop = new Shop({
    lat: req.body.lat,
    lng: req.body.lng,
    name: req.body.name,
    address: req.body.address,
    description: req.body.description,
  });

  try {
    await shop.save();

    return res.json({
      statusCode: 201,
      description: 'Shop has been created successfully.',
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
