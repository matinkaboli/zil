import { Router } from 'express';

import Shop from 'Root/models/Shop';
import logged from 'Root/middlewares/auth/logged';

const router = new Router();

router.delete('v1/shops/:shopId/photo/:photoId', logged, async (req, res) => {
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

    if (!shop.includes(req.params.photoId)) {
      return res.status(404).json({
        entity: 'photo',
        description: 'Photo not found.',
      });
    }

    shop.photos = shop.photos.filter(v => v !== req.params.photoId);

    await shop.save();

    return res.status(200).json({
      description: 'Photo has been deleted successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
