import { Router } from 'express';

import User from 'Root/models/User';
import verifySms from 'Root/utils/sms/verify';
import login from 'Root/middlewares/auth/login';
import validatePhone from 'Root/utils/validate/phone';

const router = new Router();

router.post('/users/:userPhone/resend', login, async (req, res) => {
  try {
    if (!validatePhone(req.params.userPhone)) {
      return res.status(422).json({
        entity: 'phones',
        description: 'Phone is not valid. It must be 10 digits.',
      });
    }

    const user = await User.findOne({ phone: req.params.userPhone });

    if (!user) {
      return res.status(404).json({
        entity: 'users',
        description: 'User not found.',
      });
    }

    await verifySms(req.params.userPhone);

    return res.status(200).json({
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
