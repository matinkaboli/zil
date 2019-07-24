import { Router } from 'express';

import { url } from 'Root/config';
import User from 'Root/models/User';
import random from 'Root/utils/random';
import sendEmail from 'Root/utils/email';
import Recovery from 'Root/models/Recovery';
import login from 'Root/middlewares/auth/login';
import requirements from 'Root/middlewares/requirements/body';

const router = new Router();

const reqs = requirements({
  value: 'email',
  required: true,
});

router.post('/v1/users/forget', login, reqs, async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        entity: 'user',
        description: 'User not found.',
      });
    }

    const code = await random(25);

    const rec = new Recovery({
      user: user._id,
      code,
    });

    await rec.save();

    sendEmail({
      to: user.email,
      subject: 'Zilon Password Recovery',
      html: `
        Hello,
        <br>
        Please click <a href='${url}/set/${code}'>here</a> to change your password.
        <br>
      `,
    });

    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      description: 'Unrecognizable error happened.',
    });
  }
});

export default router;
