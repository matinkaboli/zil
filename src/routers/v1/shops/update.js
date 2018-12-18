import { Router } from 'express';

import Shop from 'Root/models/Shop';
import logged from 'Root/middlewares/auth/logged';
import bodyRequirements from 'Root/middlewares/requirements/body';

const router = new Router();

const bodyReqs = bodyRequirements(
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
    value: 'username',
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

router.patch('/v1/shops/:shopId', logged, bodyReqs, async (req, res) => {
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

    if (req.body.lat) {
      shop.location.lat = req.body.lat;
    }

    if (req.body.lng) {
      shop.location.lng = req.body.lng;
    }

    if (req.body.name) {
      shop.name = req.body.name;
    }

    if (req.body.address) {
      shop.address = req.body.address;
    }

    if (req.body.username) {
      shop.username = req.body.username;
    }

    if (req.body.description) {
      shop.description = req.body.description;
    }

    if (req.body.minimumOrderPrice) {
      shop.minimumOrderPrice = req.body.minimumOrderPrice;
    }

    if (req.body.maximumDeliveryTime) {
      shop.maximumDeliveryTime = req.body.maximumDeliveryTime;
    }

    await shop.save();

    return res.status(200).json({
      description: 'Shop updated successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
