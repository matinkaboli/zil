const fetch = require('../../utils/fetch');

describe('POST /user/resend', () => {
  test('With Correct Information', () => {
    fetch('/user/resend', {
      phone: '0123456789',
    })
      .then(response => expect(response).toEqual({ statusCode: 200 }));
  });

  test('With missing information', () => {
    fetch('/user/resend', {})
      .then(response => expect(response).toEqual({
        statusCode: 417,
        requirement: 'phone',
      }));
  });

  test('With wrong info and no found user', () => {
    fetch('/user/resend', {
      phone: '9876543210',
    })
      .then(response => expect(response).toEqual({
        statusCode: 404,
        entity: 'user',
      }));
  });
});
