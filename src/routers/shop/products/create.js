import { Router } from 'express';

import Shop from 'Root/models/Shop';
import Product from 'Root/models/Product';
import ProductInShop from 'Root/models/ProductInShop';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements(
  {
    value: 'productID',
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

router.post('/shop/product/create', reqs, async (req, res) => {
  try {
    const product = await Product.findById(req.body.productID);

    if (!product) {
      return res.json({
        statusCode: 404,
        entity: 'product',
        description: 'Product not found',
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
      shop: req.body.shopID,
      product: req.body.productID,
      price: req.body.price,
    };

    if (req.body.discountedPrice) {
      values.discountedPrice = req.body.discountedPrice;
    }

    const newProductInShop = new ProductInShop(values);

    await newProductInShop.save();

    return res.json({
      statusCode: 201,
      description: 'Product has been created in the shop successfully.',
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
