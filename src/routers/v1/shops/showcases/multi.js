import { Router } from 'express';

import Shop from 'Root/models/Shop';
import Shelf from 'Root/models/Shelf';
import Showcase from 'Root/models/Showcase';
import logged from 'Root/middlewares/auth/logged';
import bodyRequirements from 'Root/middlewares/requirements/body';

const router = new Router();

const bodyReqs = bodyRequirements({
  value: 'shelves',
  required: true,
});

router.post('v1/shops/:shopId/showcases/multi', logged, bodyReqs, async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.shopId);

    if (!shop) {
      return res.status(404).json({
        entity: 'shops',
        description: 'Shop is not found.',
      });
    }

    const { shelves } = JSON.parse(req.body.shelves);

    for (const shelf of shelves) {
      const checkShelf = await Shelf.findById(shelf.shelfId);

      if (!checkShelf) {
        return res.status(404).json({
          entity: 'shelves',
          description: 'Shelf is not found',
        });
      }

      const values = {
        shop: shop._id,
        shelf: {
          _id: checkShelf._id,
          name: checkShelf.name,
        },
      };

      if (shelf.price) {
        values.price = shelf.price;
      }

      if (shelf.isbn) {
        values.shelf.isbn = checkShelf.isbn;
      }

      if (shelf.photo) {
        values.shelf.photo = checkShelf.photo;
      }

      if (shelf.expiration) {
        values.shelf.expiration = checkShelf.expiration;
      }

      if (shelf.description) {
        values.shelf.description = checkShelf.description;
      }

      if (shelf.manufacturer) {
        values.shelf.manufacturer = checkShelf.manufacturer;
      }

      if (req.body.discountedPrice) {
        values.discountedPrice = shelf.discountedPrice;
      }

      const newShowcase = new Showcase(values);

      shop.showcaseCount += 1;


      await newShowcase.save();
      await shop.save();
    }

    return res.status(201).json({
      description: 'Showcases has been added successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
