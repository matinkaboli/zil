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
    value: 'description',
    required: false,
  },
  {
    value: 'manufacturer',
    required: false,
  },
);

router.post('/shelf/update', reqs, async (req, res) => {
  try {
    const shelf = await Shelf.findById(req.body._id);

    if (!shelf) {
      return res.status(404).json({
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

    return res.status(200).json({
      description: 'Shelf has been updated successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
