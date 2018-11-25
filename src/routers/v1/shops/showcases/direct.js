import multer from 'multer';
import { Router } from 'express';

import Shop from 'Root/models/Shop';
import Shelf from 'Root/models/Shelf';
import { uploadDir } from 'Root/config';
import storage from 'Root/utils/storage';
import Showcase from 'Root/models/Showcase';
import logged from 'Root/middlewares/auth/logged';
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
    value: 'price',
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
  {
    value: 'discountedPrice',
    required: false,
  },
);

router.post('v1/shops/:shopId/showcases/direct', logged, upload.single('photo'), bodyReqs, async (req, res) => {
  try {
    const shop = await Shop.findOne({
      admin: req.user,
      _id: req.params.shopId,
    });

    if (!shop) {
      return res.status(404).json({
        entity: 'shops',
        description: 'Shop not found.',
      });
    }

    const shelfvalues = {
      name: req.body.name,
    };

    if (req.file) {
      shelfvalues.photo = req.file.filename;
    }

    if (req.body.isbn) {
      shelfvalues.isbn = req.body.isbn;
    }

    if (req.body.expiration) {
      shelfvalues.expiration = req.body.expiration;
    }

    if (req.body.description) {
      shelfvalues.description = req.body.description;
    }

    if (req.body.manufacturer) {
      shelfvalues.manufacturer = req.body.manufacturer;
    }

    const shelf = new Shelf(shelfvalues);

    await shelf.save();

    const showcaseValues = {
      shelf: shelfvalues,
      price: req.body.price,
      shop: req.params.shopId,
    };

    if (req.body.discountedPrice) {
      showcaseValues.discountedPrice = req.body.discountedPrice;
    }

    const showcase = new Showcase(showcaseValues);

    shop.showcaseCount += 1;

    await showcase.save();
    await shop.save();

    return res.status(201).json({
      description: 'Showcase has been created successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
