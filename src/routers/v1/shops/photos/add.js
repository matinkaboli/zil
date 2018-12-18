import multer from 'multer';
import { Router } from 'express';

import Shop from 'Root/models/Shop';
import { uploadDir } from 'Root/config';
import storage from 'Root/utils/storage';
import logged from 'Root/middlewares/auth/logged';

const router = new Router();

const upload = multer({ dest: uploadDir, limits: 3000000, storage });

router.post('/v1/shops/:id/photo', logged, upload.single('photo'), async (req, res) => {
  try {
    const shop = await Shop.findOne({
      admin: req.user,
      _id: req.params._id,
    });

    if (!shop) {
      return res.status(404).json({
        entity: 'shops',
        description: 'Shop not found.',
      });
    }

    if (!req.file) {
      return res.status(417).json({
        requirement: 'photo',
        description: 'The server needs a photo, but the client did not send it.',
      });
    }

    shop.photos.push(req.file.filename);

    await shop.save();

    return res.status(201).json({
      description: 'Photo has been added to the shop successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
