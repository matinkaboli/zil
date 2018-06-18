import { Router } from 'express';

import User from 'Root/models/User';

import requirements from 'Root/middlewares/requirements';

const router = new Router();
const reqs = requirements('name', 'email', 'password');

router.post('/signup', reqs, async (req, res) => {
  req.body.email = req.body.email.toLowerCase();

  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.json({ type: 2, text: 0 });
  }

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    await newUser.save();

    return res.json({ type: 0 });
  } catch (e) {
    return res.json({ type: 2, text: 10 });
  }
});

export default router;
