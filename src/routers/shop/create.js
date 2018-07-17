import multer from 'multer';
import { Router } from 'express';

import { uploadDir } from 'Root/config';
import storage from 'Root/utils/storage';

import Shop from 'Root/models/Shop';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const upload = multer({ dest: uploadDir, limits: 3000000, storage });

const reqs = requirements(
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
    required: false,
  },
  {
    value: 'description',
    required: false,
  },
  {
    value: 'minimumOrderPrice',
    required: true,
  },
  {
    value: 'maximumDeliveryTime',
    required: true,
  },
);

router.post('/shop/create', upload.single('photo'), reqs, async (req, res) => {
  const values = {
    photos: [],
    name: req.body.name,
    minimumOrderPrice: req.body.minimumOrderPrice,
    maximumDeliveryTime: req.body.maximumDeliveryTime,
  };

  if (req.body.description) {
    values.description = req.body.description;
  }

  if (req.body.address) {
    values.address = req.body.address;
  }

  if (req.body.lat && req.body.lng) {
    values.location = {
      lat: req.body.lat,
      lng: req.body.lng,
    };
  }

  if (req.file) {
    values.photos.push(req.file.filename);
  }


  const shop = new Shop(values);

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
