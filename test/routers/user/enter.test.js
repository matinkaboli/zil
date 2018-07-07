const fetch = require('../../utils/fetch');

test('POST /user/enter', () => {
  fetch('/user/enter', {
    phone: '0123456789',
  })
    .then(response => {
      expect(response.statusCode).toBe(200);
    });
});
