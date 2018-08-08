import { Router } from 'express';

import Shop from 'Root/models/Shop';
import logged from 'Root/middlewares/auth/logged';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements({
  value: 'username',
  required: true,
});

router.post('/shop/check-username', logged, reqs, async (req, res) => {
  try {
    const shop = await Shop.findOne({
      username: req.body.username.toLowerCase(),
    });

    if (shop) {
      return res.status(409).json({
        description: 'Username has been taken by someone else.',
      });
    }

    return res.status(200).json({
      description: `Username **${req.body.username}** has not been taken.`,
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
