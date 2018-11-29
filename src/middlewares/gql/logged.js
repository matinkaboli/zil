import jwt from 'Root/utils/jwt';
import Token from 'Root/models/Token';
import pureToken from 'Root/utils/pureToken';

export default token => new Promise(async (resolve, reject) => {
  if (!token) {
    return reject();
  }

  const t = await jwt.verify(pureToken(token));

  if (!t) {
    return reject();
  }

  const checkDatabase = await Token.findOne({ user: t._id });

  if (!checkDatabase) {
    return reject();
  }

  return resolve(t._id);
});
