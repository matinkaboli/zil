import { Router } from 'express';

import User from 'Root/models/User';
import Code from 'Root/models/Code';

import requirements from 'Root/middlewares/requirements';
import validatePhone from 'Root/utils/validate/phone';
import randomNumber from 'Root/utils/randomNumber';

const router = new Router();
const reqs = requirements('phone');


router.post('/enter', reqs, async (req, res) => {
  if (!validatePhone(req.body.phone)) {
    return res.json({ type: 2, text: 30 });
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
    } catch (e) {
      console.log(e);
      return res.json({ type: 2, text: 0 });
    }
  }

  let code = await Code.findOne({ user: user._id });

  if (!code) {
    code = new Code({
      user: user._id,
      code: rand,
    });

    try {
      await code.save();
    } catch (e) {
      return res.json({ type: 2, text: 1 });
    }
  }

  return res.json({ type: 0, isUserNew });
});

export default router;
