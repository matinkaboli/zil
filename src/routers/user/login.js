import { Router } from 'express';

import User from 'Root/models/User';
import Code from 'Root/models/Code';
import Attempt from 'Root/models/Attempt';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements(
  {
    value: 'phone',
    required: true,
  },
  {
    value: 'code',
    required: true,
  },
);

router.post('/login', reqs, async (req, res) => {
  const user = await User.findOne({ phone: req.body.phone });

  if (!user) {
    return res.json({ statusCode: 404, entity: 'user' });
  }

  const code = await Code.findOne({ user: user._id });

  if (!code) {
    return res.json({ statusCode: 404, entity: 'code' });
  }

  let attempt = await Attempt.findOne({ user: user._id });

  if (!attempt) {
    attempt = new Attempt({
      user: user._id,
    });

    await attempt.save();
  }

  attempt.attempts += 1;

  attempt.save();

  if (attempt.attempts > 10) {
    return res.json({ statusCode: 429 });
  }

  if (req.body.code === code.phone) {
    code.remove();

    return res.json({ statusCode: 200 });
  }

  return res.json({ statusCode: 498, entity: 'code' });
});

export default router;
