const fetch = require('../../utils/fetch');

describe('POST /product/create', () => {
  test('With correct information', () => {
    fetch('/product/create', {
      name: 'Glass',
      isbn: '123-456-789-0',
      description: 'This is a Glass',
    })
      .then(response => expect(response.statusCode).toBe(200));
  });
});
