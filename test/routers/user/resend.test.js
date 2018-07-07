const fetch = require('../../utils/fetch');

test('POST /user/resend', () => {
  fetch('/user/resend', {
    phone: '0123456789',
  })
    .then(response => expect(response.statusCode).toBe(200));
});
