import { Router } from 'express';

import Shop from 'Root/models/Shop';
import Shelf from 'Root/models/Shelf';
import Showcase from 'Root/models/Showcase';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements(
  {
    value: 'shelfID',
    required: true,
  },
  {
    value: 'shopID',
    required: true,
  },
  {
    value: 'price',
    required: true,
  },
  {
    value: 'discountedPrice',
    required: false,
  },
);

router.post('/shop/showcase/create', reqs, async (req, res) => {
  try {
    const shelf = await Shelf.findById(req.body.shelfID);

    if (!shelf) {
      return res.json({
        statusCode: 404,
        entity: 'shelf',
        description: 'Shelf not found',
      });
    }

    const shop = await Shop.findById(req.body.shopID);

    if (!shop) {
      return res.json({
        entity: 'shop',
        statusCode: 404,
        description: 'Shop not found',
      });
    }

    const values = {
      price: req.body.price,
      shop: req.body.shopID,
      shelf: req.body.shelfID,
    };

    if (req.body.discountedPrice) {
      values.discountedPrice = req.body.discountedPrice;
    }

    const newShowcase = new Showcase(values);

    await newShowcase.save();

    return res.json({
      statusCode: 201,
      description: 'Showcase has been created in the shop successfully.',
    });
  } catch (error) {
    return res.json({
      statusCode: 520,
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
