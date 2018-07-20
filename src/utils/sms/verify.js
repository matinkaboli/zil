import fetch from 'node-fetch';

import otp from 'Root/utils/otp';
import { sms } from 'Root/config';
import checkStatus from 'Root/utils/checkstatus';

export default receptor => new Promise((resolve, reject) => {
  const token = otp.generate();
  const body = `token=${token}&template=${sms.template}&receptor=${receptor}`;

  fetch(
    `https://api.kavenegar.com/v1/${sms.apiKey}/verify/lookup.json`,
    {
      body,
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Length': `${body.length}`,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    },
  )
    .then(checkStatus)
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(error => reject(error));
});
