import { Router } from 'express';

import fetch from 'node-fetch';
import { pushe } from 'Root/config';

const router = new Router();

router.post('/test-push', async (req, res) => {
  console.log(req.body.body);

  const response = await fetch(pushe.url, {
    method: 'POST',
    body: JSON.stringify(JSON.parse(req.body.body)),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${pushe.token}`,
    },
  }).then(status => status.json());

  res.json(response);
});

export default router;
