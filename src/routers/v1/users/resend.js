import { Router } from 'express';

import User from 'Root/models/User';
import verifySms from 'Root/utils/sms/verify';
import login from 'Root/middlewares/auth/login';
import bodyRequirements from 'Root/middlewares/requirements/body';

const router = new Router();

const bodyReqs = bodyRequirements({
  value: 'phone',
  required: true,
});

router.post('v1/users/resend', login, bodyReqs, async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.body.phone });

    if (!user) {
      return res.status(404).json({
        entity: 'users',
        description: 'User not found.',
      });
    }

    await verifySms(req.body.phone);

    return res.status(204).json({
      description: 'The verification link has been sent to user\'s phone number.',
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
