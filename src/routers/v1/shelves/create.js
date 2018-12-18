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

router.post('/v1/shelves', upload.single('photo'), bodyReqs, async (req, res) => {
  const values = {
    name: req.body.name,
  };

  if (req.body.isbn) {
    values.isbn = req.body.isbn;
  }

  if (req.file) {
    values.photo = req.file.filename;
  }

  if (req.body.expiration) {
    values.expiration = req.body.expiration;
  }

  if (req.body.description) {
    values.description = req.body.description;
  }

  if (req.body.manufacturer) {
    values.manufacturer = req.body.manufacturer;
  }

  const shelf = new Shelf(values);

  try {
    await shelf.save();

    return res.status(201).json({
      description: 'Shelf has been created successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
