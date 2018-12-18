import { Router } from 'express';

import Shop from 'Root/models/Shop';
import Showcase from 'Root/models/Showcase';
import logged from 'Root/middlewares/auth/logged';
import bodyRequirements from 'Root/middlewares/requirements/body';

const router = new Router();

const bodyReqs = bodyRequirements({
  value: 'available',
  required: true,
});

router.patch('/v1/shops/:shopId/showcases/:showcaseId/availability', logged, bodyReqs, async (req, res) => {
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

    const showcase = await Showcase.findOne({
      shop: req.params.shopId,
      _id: req.params.showcaseId,
    });

    if (!showcase) {
      return res.status(404).json({
        entity: 'showcases',
        description: 'Showcase not found.',
      });
    }

    if (!showcase.price && !showcase.discountedPrice) {
      return res.status(401).json({
        description: 'The showcase does not have price or discountedPrice.',
      });
    }

    showcase.available = req.body.available;

    await showcase.save();

    return res.status(200).json({
      description: 'The showcase availability has been changed successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
