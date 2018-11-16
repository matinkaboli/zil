import fetch from 'node-fetch';

import { pushe } from 'Root/config';
import checkStatus from 'Root/utils/checkstatus';

export default (body) => new Promise((resolve, reject) => {
  console.log(body);
  fetch(pushe.url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${pushe.token}`,
    },
  })
    .then(checkStatus)
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(error => reject(error));
});
