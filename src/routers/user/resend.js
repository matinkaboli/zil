import fetch from 'node-fetch';
import { Router } from 'express';

import otp from 'Root/utils/otp';
import { sms } from 'Root/config';
import User from 'Root/models/User';
import login from 'Root/middlewares/auth/login';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements({
  value: 'phone',
  required: true,
});

router.post('/user/resend', login, reqs, async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.body.phone });

    if (!user) {
      return res.json({
        entity: 'user',
        statusCode: 404,
        description: 'User not found.',
      });
    }

    fetch(
      `https://api.kavenegar.com/v1/${sms.apiKey}/verify/lookup.json`,
      {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          template: sms.template,
          token: otp.generate(),
          receptor: req.body.phone,
        }),
      },
    );

    return res.json({
      statusCode: 200,
      description: 'The verification link has been sent to user\'s phone number',
    });
  } catch (error) {
    return res.json({
      error,
      statusCode: 520,
      description: 'Unrecognizable error happened',
    });
  }
});

export default router;
