import { Router } from 'express';

import Recovery from 'Root/models/Recovery';
import login from 'Root/middlewares/auth/login';
import requirements from 'Root/middlewares/requirements/params';

const router = new Router();

const reqs = requirements({
  value: 'code',
  required: true,
});

router.post('/v1/users/forget/:code', login, reqs, async (req, res) => {
  try {
    const code = await Recovery.findOne({
      code: req.params.code,
    });

    if (!code) {
      return res.status(404).json({
        entity: 'code',
        description: 'The code is invalid.',
      });
    }

    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
