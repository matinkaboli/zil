import { Router } from 'express';

import User from 'Root/models/User';
import Code from 'Root/models/Code';
import randomNumber from 'Root/utils/randomNumber';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements({
  value: 'phone',
  required: true,
});

router.post('/user/resend', reqs, async (req, res) => {
  const user = await User.findOne({ phone: req.body.phone });

  if (!user) {
    return res.json({
      entity: 'user',
      statusCode: 404,
      description: 'User not found.',
    });
  }

  const code = await Code.findOne({ user: user._id });

  if (code) {
    code.remove();
  }

  const newCode = new Code({
    user: user._id,
    code: randomNumber(),
  });

  try {
    await newCode.save();

    return res.json({
      statusCode: 200,
      description: 'The verification link has been sent to user\'s email',
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
