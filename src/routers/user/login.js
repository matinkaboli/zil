import { Router } from 'express';

import User from 'Root/models/User';
import Code from 'Root/models/Code';

import requirements from 'Root/middlewares/requirements';

const router = new Router();
const reqs = requirements('phone', 'code');

router.post('/login', reqs, async (req, res) => {
  const user = await User.findOne({ phone: req.body.phone });

  if (!user) {
    return res.json({ type: 2, text: 0 });
  }

  const code = await Code.findOne({ user: user._id });

  if (!code) {
    return res.json({ type: 2, text: 1 });
  }

  if (req.body.code !== code.phone) {
    return res.json({ type: 2, text: 2 });
  }

  code.remove();

  return res.json({ type: 0 });
});

export default router;
