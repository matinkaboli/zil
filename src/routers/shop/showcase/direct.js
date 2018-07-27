import multer from 'multer';
import { Router } from 'express';

import Shop from 'Root/models/Shop';
import Shelf from 'Root/models/Shelf';
import { uploadDir } from 'Root/config';
import storage from 'Root/utils/storage';
import Showcase from 'Root/models/Showcase';
import logged from 'Root/middlewares/auth/logged';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const upload = multer({ dest: uploadDir, limits: 3000000, storage });

const reqs = requirements(
  {
    value: 'name',
    required: true,
  },
  {
    value: 'isbn',
    required: false,
  },
  {
    value: 'price',
    required: true,
  },
  {
    value: 'shopId',
    required: true,
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
  {
    value: 'discountedPrice',
    required: false,
  },
);

router.post('/shop/showcase/direct', logged, upload.single('photo'), reqs, async (req, res) => {
  try {
    const shop = await Shop.find({
      _id: req.body.shopId,
      admin: req.user,
    });

    if (!shop) {
      return res.status(404).json({
        entity: 'shop',
        description: 'Shop not found.',
      });
    }

    const Shelfvalues = {
      name: req.body.name,
    };

    if (req.file) {
      Shelfvalues.photo = req.file.filename;
    }

    if (req.body.isbn) {
      Shelfvalues.isbn = req.body.isbn;
    }

    if (req.body.expiration) {
      Shelfvalues.expiration = req.body.expiration;
    }

    if (req.body.description) {
      Shelfvalues.description = req.body.description;
    }

    if (req.body.manufacturer) {
      Shelfvalues.manufacturer = req.body.manufacturer;
    }

    const shelf = new Shelf(Shelfvalues);

    shelf.save();

    const showcaseValues = {
      shelf: shelf._id,
      price: req.body.price,
      shop: req.body.shopId,
    };

    if (req.body.discountedPrice) {
      showcaseValues.discountedPrice = req.body.discountedPrice;
    }

    const showcase = new Showcase(showcaseValues);

    await showcase.save();

    shop.showcaseCount += 1;

    await shop.save();

    return res.status(201).json({
      description: 'Showcase has been created',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
