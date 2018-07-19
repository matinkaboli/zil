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

    if (!user) {
      isUserNew = true;

      user = new User({
        phone: req.body.phone,
      });

      await user.save();
    }

    await verifySms(req.body.phone);

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
      error: error.message,
      statusCode: 520,
      description: 'Unrecognizable error happened',
    });
  }
});

export default router;
