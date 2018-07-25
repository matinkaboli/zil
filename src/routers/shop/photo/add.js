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
  value: 'shopId',
  required: true,
});

router.post('/shop/photo/add', logged, reqs, upload.single('photo'), async (req, res) => {
  try {
    const shop = await Shop.findOne({
      admin: req.user,
      _id: req.body.shopId,
    });

    if (!shop) {
      return res.json({
        entity: 'shop',
        statusCode: 404,
        description: 'Shop not found.',
      });
    }

    if (!req.file) {
      return res.json({
        statusCode: 417,
        requirement: 'photo',
        description: 'The server needs a photo, but the client did not send it',
      });
    }

    shop.photos.push(req.file.filename);

    await shop.save();

    return res.json({
      statusCode: 200,
      description: 'Photo has been successfully added to the shop.',
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
