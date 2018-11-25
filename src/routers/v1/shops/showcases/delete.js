import { Router } from 'express';

import Shop from 'Root/models/Shop';
import Showcase from 'Root/models/Showcase';
import logged from 'Root/middlewares/auth/logged';

const router = new Router();

router.delete('/shops/:shopId/showcases/:showcaseId', logged, async (req, res) => {
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

    shop.showcaseCount -= 1;

    await showcase.remove();
    await shop.save();

    return res.status(200).json({
      description: 'Showcase has been deleted successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
