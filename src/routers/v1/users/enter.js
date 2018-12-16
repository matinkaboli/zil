import { Router } from 'express';

import User from 'Root/models/User';
import verifySms from 'Root/utils/sms/verify';
import login from 'Root/middlewares/auth/login';
import validatePhone from 'Root/utils/validate/phone';
import bodyRequirements from 'Root/middlewares/requirements/body';

const router = new Router();

const bodyReqs = bodyRequirements(
  {
    value: 'phone',
    required: true,
  },
  {
    value: 'pusheId',
    required: true,
  },
);

router.post('v1/users/enter', login, bodyReqs, async (req, res) => {
  try {
    if (!validatePhone(req.body.phone)) {
      return res.status(422).json({
        entity: 'phone',
        description: 'Phone is not valid. It must be 10 digits.',
      });
    }

    let isUserNew = false;

    let user = await User.findOne({ phone: req.body.phone });

    if (!user) {
      isUserNew = true;

      user = new User({
        phone: req.body.phone,
        pusheId: req.body.pusheId,
      });

      await user.save();
    } else {
      user.pusheId = req.body.pusheId;

      await user.save();
    }

    await verifySms(req.body.phone);

    const description = isUserNew ?
      'User created and the verification code has been sent to his number' :
      'The verification code has been sent to his number';

    return res.status(200).json({
      isUserNew,
      description,
      _id: user._id,
    });
  } catch (error) {
    return res.status(520).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
