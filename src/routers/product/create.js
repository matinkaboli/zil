import multer from 'multer';
import { Router } from 'express';

import { uploadDir } from 'Root/config';
import storage from 'Root/utils/storage';
import Product from 'Root/models/Product';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const upload = multer({ dest: uploadDir, limits: 3000000, storage });

const reqs = requirements(
  {
    value: 'name',
    required: true,
  },
  {
    value: 'isbn',
    required: false,
  },
  {
    value: 'expiration',
    required: false,
  },
  {
    value: 'manufacturer',
    required: false,
  },
  {
    value: 'description',
    required: false,
  },
);

router.post('/product/create', upload.single('photo'), reqs, async (req, res) => {
  const productValues = {
    name: req.body.name,
  };

  const optionalValues = ['isbn', 'expiration', 'manufacturer', 'description'];

  for (const optionalValue of optionalValues) {
    if (req.body[optionalValue]) {
      productValues[optionalValue] = req.body[optionalValue];
    }
  }

  if (req.file) {
    productValues.photo = req.file.filename;
  }

  const product = new Product(productValues);

  try {
    await product.save();

    return res.json({
      statusCode: 201,
      description: 'Product has been created successfully.',
    });
  } catch (error) {
    return res.json({
      error,
      statusCode: 520,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
