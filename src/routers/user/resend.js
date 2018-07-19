import { Router } from 'express';

import User from 'Root/models/User';
import verifySms from 'Root/utils/sms/verify';
import login from 'Root/middlewares/auth/login';
import validatePhone from 'Root/utils/validate/phone';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements({
  value: 'phone',
  required: true,
});

router.post('/user/resend', login, reqs, async (req, res) => {
  try {
    if (!validatePhone(req.body.phone)) {
      return res.json({
        entity: 'phone',
        statusCode: 422,
        description: 'Phone is not valid. It must be 10 digits.',
      });
    }

    const user = await User.findOne({ phone: req.body.phone });

    if (!user) {
      return res.json({
        entity: 'user',
        statusCode: 404,
        description: 'User not found.',
      });
    }

    await verifySms(req.body.phone);

    return res.json({
      statusCode: 200,
      description: 'The verification link has been sent to user\'s phone number',
    });
  } catch (error) {
    return res.json({
      statusCode: 520,
      error: error.message,
      description: 'Unrecognizable error happened',
    });
  }
});

export default router;
