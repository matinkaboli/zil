import { Router } from 'express';

import Shop from 'Root/models/Shop';
import Showcase from 'Root/models/Showcase';
import logged from 'Root/middlewares/auth/logged';
import bodyRequirements from 'Root/middlewares/requirements/body';

const router = new Router();

const reqs = bodyRequirements(
  {
    value: 'name',
    required: false,
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

router.patch('v1/shops/:shopId/showcases/:showcaseId', logged, reqs, async (req, res) => {
  try {
    const shop = await Shop.findOne({
      admin: req.user,
      _id: req.body.shopId,
    });

    if (!shop) {
      return res.status(404).json({
        entity: 'shops',
        description: 'Shop not found.',
      });
    }

    const showcase = await Showcase.findById({
      shop: req.params.shopId,
      _id: req.params.showcaseId,
    });

    if (!showcase) {
      return res.status(404).json({
        entity: 'showcases',
        description: 'Showcase not found.',
      });
    }

    if (req.body.name) {
      showcase.shelf.name = req.body.name;
    }

    if (req.body.isbn) {
      showcase.shelf.isbn = req.body.isbn;
    }

    if (req.body.price) {
      showcase.price = req.body.price;
    }

    if (req.body.expiration) {
      showcase.shelf.expiration = req.body.expiration;
    }

    if (req.body.description) {
      showcase.shelf.description = req.body.description;
    }

    if (req.body.manufacturer) {
      showcase.shelf.manufacturer = req.body.manufacturer;
    }

    if (req.body.discountedPrice) {
      showcase.discountedPrice = req.body.discountedPrice;
    }

    await showcase.save();

    return res.status(200).json({
      description: 'Showcase has been updated successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
