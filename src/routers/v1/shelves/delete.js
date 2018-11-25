import { Router } from 'express';

import Shelf from 'Root/models/Shelf';

const router = new Router();

router.delete('/shelves/:shelfId', async (req, res) => {
  try {
    const shelf = await Shelf.findById(req.body._id);

    if (!shelf) {
      return res.status(404).json({
        entity: 'shelves',
        description: 'Shelf not found.',
      });
    }

    await shelf.remove();

    return res.status(200).json({
      description: 'Shelf has been deleted successfully.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
