const fetch = require('../../utils/fetch');

describe('POST /user/enter', () => {
  test('With correct information', () => {
    fetch('/user/enter', {
      phone: '9127598592',
    })
      .then(response => expect(response.statusCode).toBe(200));
  });

  test('With wrong phone number', () => {
    fetch('/user/enter', {
      phone: 'this is Matin Kaboli',
    })
      .then(response =>
        expect(response).toEqual({ entity: 'phone', statusCode: 422 }));
  });
});
