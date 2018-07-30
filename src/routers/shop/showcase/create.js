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
    required: true,
  },
  {
    value: 'shopId',
    required: true,
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

router.post('/shop/showcase/create', logged, reqs, async (req, res) => {
  try {
    const shelf = await Shelf.findById(req.body.shelfId);

    if (!shelf) {
      return res.status(404).json({
        entity: 'shelf',
        description: 'Shelf not found.',
      });
    }

    const shop = await Shop.findOne({
      admin: req.user,
      _id: req.body.shopId,
    });

    if (!shop) {
      return res.status(404).json({
        entity: 'shop',
        description: 'Shop not found.',
      });
    }

    const values = {
      price: req.body.price,
      shop: req.body.shopId,
      shelf: {
        name: shelf.name,
      },
    };

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
    shop.save();

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
