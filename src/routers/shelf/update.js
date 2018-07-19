import { Router } from 'express';

import Shelf from 'Root/models/Shelf';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements(
  {
    value: '_id',
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

router.post('/shelf/update', reqs, async (req, res) => {
  try {
    const shelf = await Shelf.findById(req.body._id);

    if (!shelf) {
      return res.json({
        statusCode: 404,
        entity: 'product',
        description: 'Product not found.',
      });
    }

    const values = [
      'name',
      'isbn',
      'expiration',
      'description',
      'manufacturer',
    ];

    for (const value of values) {
      shelf[value] = req.body[value] || values[value] || '';
    }

    await shelf.save();

    return res.json({
      statusCode: 200,
      description: 'Product has been updated successfully.',
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
