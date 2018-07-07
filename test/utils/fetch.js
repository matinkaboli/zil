const fetch = require('node-fetch');

export default (url, data) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8080${url}`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(res => res.json())
    .then(resData => resolve(resData))
    .catch(err => reject(err));
});
