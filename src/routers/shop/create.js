import multer from 'multer';
import { Router } from 'express';

import Shop from 'Root/models/Shop';
import Follow from 'Root/models/Follow';
import { uploadDir } from 'Root/config';
import storage from 'Root/utils/storage';
import logged from 'Root/middlewares/auth/logged';
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

router.post('/shop/create', logged, upload.single('photo'), reqs, async (req, res) => {
  const values = {
    photos: [],
    admin: req.user,
    showcaseCount: 0,
    followersCount: 0,
    name: req.body.name,
    minimumOrderPrice: req.body.minimumOrderPrice,
    maximumDeliveryTime: req.body.maximumDeliveryTime,
  };

  if (req.file) {
    values.photos.push(req.file.filename);
  }

  if (req.body.address) {
    values.address = req.body.address;
  }

  if (req.body.description) {
    values.description = req.body.description;
  }

  if (req.body.lat && req.body.lng) {
    values.location = {
      lat: req.body.lat,
      lng: req.body.lng,
    };
  }

  const shop = new Shop(values);

  const follow = new Follow({
    user: req.user,
    shop: shop._id,
  });

  try {
    await shop.save();
    await follow.save();

    return res.status(201).json({
      _id: shop._id,
      description: 'Shop has been created successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
