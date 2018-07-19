import fetch from 'node-fetch';

import otp from 'Root/utils/otp';
import { sms } from 'Root/config';

export default receptor => new Promise((resolve, reject) => {
  fetch(
    `https://api.kavenegar.com/v1/${sms.apiKey}/verify/lookup.json`,
    {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        token: otp.generate(),
        template: sms.template,
        receptor: `+98${receptor}`,
      }),
    },
  )
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(error => reject(error));
});
