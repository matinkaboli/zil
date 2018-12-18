import multer from 'multer';
import { Router } from 'express';

import Shelf from 'Root/models/Shelf';
import { uploadDir } from 'Root/config';
import storage from 'Root/utils/storage';
import bodyRequirements from 'Root/middlewares/requirements/body';

const router = new Router();

const upload = multer({ dest: uploadDir, limits: 3000000, storage });

const bodyReqs = bodyRequirements(
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

router.patch('/v1/shelves/:shelfId', bodyReqs, upload.single('photo'), async (req, res) => {
  try {
    const shelf = await Shelf.findById(req.params.shelfId);

    if (!shelf) {
      return res.status(404).json({
        entity: 'shelves',
        description: 'Shelf not found.',
      });
    }

    if (req.body.isbn) {
      shelf.isbn = req.body.isbn;
    }

    if (req.body.name) {
      shelf.name = req.body.name;
    }

    if (req.file) {
      shelf.photo = req.file.filename;
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
