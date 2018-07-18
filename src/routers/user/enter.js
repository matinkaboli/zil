import fetch from 'node-fetch';
import { Router } from 'express';

import { sms } from 'Root/config';
import User from 'Root/models/User';
import Code from 'Root/models/Code';
import login from 'Root/middlewares/auth/login';
import randomNumber from 'Root/utils/randomNumber';
import validatePhone from 'Root/utils/validate/phone';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements({
  value: 'phone',
  required: true,
});

router.post('/user/enter', login, reqs, async (req, res) => {
  try {
    if (!validatePhone(req.body.phone)) {
      return res.json({
        entity: 'phone',
        statusCode: 422,
        description: 'Phone is not valid. It must be 10 digits.',
      });
    }

    let isUserNew = false;

    let user = await User.findOne({ phone: req.body.phone });

    const rand = randomNumber();

    if (!user) {
      isUserNew = true;

      user = new User({
        phone: req.body.phone,
      });

      await user.save();
    }

    let code = await Code.findOne({ user: user._id });

    if (!code) {
      code = new Code({
        code: rand,
        user: user._id,
      });

      await code.save();
    }

    await fetch(
      `https://api.kavenegar.com/v1/${sms.apiKey}/sms/send.json`,
      {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          receptor: req.body.phone,
          message: `${sms.messageTemplate}${rand}`,
        }),
      },
    );

    const description = isUserNew ?
      'User created and the verification code has been sent to his number' :
      'The verification code has been sent to his number';

    return res.json({
      isUserNew,
      description,
      statusCode: 200,
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
