import { Router } from 'express';

import Shop from 'Root/models/Shop';
import Shelf from 'Root/models/Shelf';
import Showcase from 'Root/models/Showcase';
import logged from 'Root/middlewares/auth/logged';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements(
  {
    value: 'price',
    required: false,
  },
  {
    value: 'shelfId',
    required: true,
  },
  {
    value: 'discountedPrice',
    required: false,
  },
);

router.post('/shops/:shopId/showcases/', logged, reqs, async (req, res) => {
  try {
    const shelf = await Shelf.findById(req.body.shelfId);

    if (!shelf) {
      return res.status(404).json({
        entity: 'shelves',
        description: 'Shelf not found.',
      });
    }

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

    const values = {
      shop: shop._id,
      shelf: {
        _id: shelf._id,
        name: shelf.name,
      },
    };

    if (req.body.price) {
      values.price = req.body.price;
    }

    if (shelf.isbn) {
      values.shelf.isbn = shelf.isbn;
    }

    if (shelf.photo) {
      values.shelf.photo = shelf.photo;
    }

    if (shelf.expiration) {
      values.shelf.expiration = shelf.expiration;
    }

    if (shelf.description) {
      values.shelf.description = shelf.description;
    }

    if (shelf.manufacturer) {
      values.shelf.manufacturer = shelf.manufacturer;
    }

    if (req.body.discountedPrice) {
      values.discountedPrice = req.body.discountedPrice;
    }

    const newShowcase = new Showcase(values);

    shop.showcaseCount += 1;

    await newShowcase.save();
    await shop.save();

    return res.status(201).json({
      description: 'Showcase has been created in the shop successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
