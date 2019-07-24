import { Router } from 'express';

import hmac from 'Root/utils/hmac';
import User from 'Root/models/User';
import { hashKey } from 'Root/config';
import Recovery from 'Root/models/Recovery';
import login from 'Root/middlewares/auth/login';
import bodyRequirements from 'Root/middlewares/requirements/body';
import paramsRequirements from 'Root/middlewares/requirements/params';

const router = new Router();

const bodyReqs = bodyRequirements({
  value: 'password',
  required: true,
});

const paramsReqs = paramsRequirements({
  value: 'code',
  required: true,
});

router.post('/v1/users/set/:code', login, paramsReqs, bodyReqs, async (req, res) => {
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

    const user = await User.findById(code.user);

    const password = hmac(req.body.password, hashKey);

    user.password = password;

    await user.save();

    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
