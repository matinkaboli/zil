import { Router } from 'express';

// import Product from 'Root/models/Product';

import requirements from 'Root/middlewares/requirements';

const router = new Router();
const reqs = requirements(
  {
    value: 'name',
    required: true,
  },
  {
    value: 'isbn',
    required: false,
  },
  {
    value: 'expiration',
    required: false,
  },
);

router.post('/product/add', reqs, async (req, res) => {
  res.json({ type: 2 });
});

export default router;
