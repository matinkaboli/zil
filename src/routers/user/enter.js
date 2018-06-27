import { Router } from 'express';

import User from 'Root/models/User';
import Code from 'Root/models/Code';
import randomNumber from 'Root/utils/randomNumber';
import validatePhone from 'Root/utils/validate/phone';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements({
  value: 'phone',
  required: true,
});

router.post('/enter', reqs, async (req, res) => {
  if (!validatePhone(req.body.phone)) {
    return res.json({ statusCode: 422, entity: 'phone' });
  }

  let isUserNew = false;

  let user = await User.findOne({ phone: req.body.phone });

  const rand = randomNumber();

  if (!user) {
    isUserNew = true;

    user = new User({
      phone: req.body.phone,
    });

    try {
      await user.save();
    } catch (error) {
      return res.json({ statusCode: 520, error });
    }
  }

  let code = await Code.findOne({ user: user._id });

  if (!code) {
    code = new Code({
      code: rand,
      user: user._id,
    });

    try {
      await code.save();
    } catch (error) {
      return res.json({ statusCode: 520, error });
    }
  }

  return res.json({ statusCode: 200, isUserNew });
});

export default router;
