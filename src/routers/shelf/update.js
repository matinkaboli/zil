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
        entity: 'shelf',
        description: 'Shelf not found.',
      });
    }

    if (req.body.isbn) {
      shelf.isbn = req.body.isbn;
    }

    if (req.body.name) {
      shelf.name = req.body.name;
    }

    if (req.body.expiration) {
      shelf.expiration = req.body.expiration;
    }

    if (req.body.description) {
      shelf.description = req.body.description;
    }

    if (req.body.manufacturer) {
      shelf.manufacturer = req.body.manufacturer;
    }

    await shelf.save();

    return res.json({
      statusCode: 200,
      description: 'Shelf has been updated successfully.',
    });
  } catch (error) {
    return res.json({
      statusCode: 520,
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
