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
        entity: 'shelf',
        description: 'Shelf not found.',
      });
    }

    await shelf.remove();

    return res.json({
      statusCode: 200,
      description: 'Shelf has been deleted successfully.',
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
