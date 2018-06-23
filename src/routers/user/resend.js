import { Router } from 'express';

import User from 'Root/models/User';
import Code from 'Root/models/Code';

import requirements from 'Root/middlewares/requirements';
import randomNumber from 'Root/utils/randomNumber';

const router = new Router();
const reqs = requirements('phone');

router.post('/resend', reqs, async (req, res) => {
  const user = await User.findOne({ phone: req.body.phone });

  if (!user) {
    return res.json({ type: 2, text: 0 });
  }

  const code = await Code.findOne({ user: user._id });

  if (code) {
    code.remove();
  }

  const newCode = new Code({
    user: user._id,
    code: randomNumber(),
  });

  await newCode.save();

  return res.json({ type: 0 });
});

export default router;
