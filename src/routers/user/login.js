import { Router } from 'express';

import User from 'Root/models/User';

import requirements from 'Root/middlewares/requirements';
import password from 'Root/utils/validate/password';
import email from 'Root/utils/validate/email';
import { hashKey } from 'Root/config';
import hash from 'Root/utils/hash';

const router = new Router();
const reqs = requirements('email', 'password');

router.post('/login', reqs, async (req, res) => {
  req.body.email = req.body.email.toLowerCase();

  if (!email(req.body.email)) {
    return res.json({ type: 2, text: 0 });
  }

  if (!password(req.body.password)) {
    return res.json({ type: 2, text: 1 });
  }

  const user = await User.findOne({
    email: req.body.email,
    password: hash(req.body.password, hashKey),
  });

  if (!user) {
    return res.json({ type: 2, text: 2 });
  }

  return res.json({ type: 0 });
});

export default router;
