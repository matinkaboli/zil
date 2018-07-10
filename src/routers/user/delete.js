import { Router } from 'express';

import User from 'Root/models/User';
import logged from 'Root/middlewares/auth/logged';
import requirements from 'Root/middlewares/requirements';

const router = new Router();

const reqs = requirements({
  value: '_id',
  required: true,
});

router.post('/user/delete', logged, reqs, async (req, res) => {
  try {
    const user = await User.findById(req.body._id);

    if (!user) {
      return res.json({ statusCode: 404, entity: 'user' });
    }

    await user.remove();

    return res.json({ statusCode: 200 });
  } catch (error) {
    return res.json({ statusCode: 520, error });
  }
});

export default router;
