import { Router } from 'express';

import Shelf from 'Root/models/Shelf';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements({
  type: '_id',
  required: true,
});

router.post('/shelf/delete', reqs, async (req, res) => {
  try {
    const shelf = await Shelf.findById(req.body._id);

    if (!shelf) {
      return res.json({
        statusCode: 404,
        entity: 'product',
        description: 'Product not found.',
      });
    }

    await shelf.remove();

    return res.json({
      statusCode: 200,
      description: 'The product has been deleted successfully.',
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
