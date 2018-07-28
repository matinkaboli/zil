import multer from 'multer';
import { Router } from 'express';

import Shop from 'Root/models/Shop';
import { uploadDir } from 'Root/config';
import storage from 'Root/utils/storage';
import logged from 'Root/middlewares/auth/logged';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const upload = multer({ dest: uploadDir, limits: 3000000, storage });

const reqs = requirements({
  value: '_id',
  required: true,
});

router.post('/shop/photo/add', logged, reqs, upload.single('photo'), async (req, res) => {
  try {
    const shop = await Shop.findOne({
      admin: req.user,
      _id: req.body._id,
    });

    if (!shop) {
      return res.status(404).json({
        entity: 'shop',
        description: 'Shop not found.',
      });
    }

    if (!req.file) {
      return res.status(417).json({
        requirement: 'photo',
        description: 'The server needs a photo, but the client did not send it',
      });
    }

    shop.photos.push(req.file.filename);

    await shop.save();

    return res.status(200).json({
      description: 'Photo has been successfully added to the shop.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
