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
    value: 'realPrice',
    required: false,
  },
  {
    value: 'discountedPrice',
    required: true,
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
      discountedPrice: req.body.discountedPrice,
    };

    if (req.body.realPrice) {
      values.realPrice = req.body.realPrice;
    }

    const newProductInShop = new ProductInShop(values);

    await newProductInShop.save();

    return res.json({
      statusCode: 200,
      description: 'Product has been added to the shop successfully.',
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
