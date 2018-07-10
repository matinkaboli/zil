import jwt from 'jsonwebtoken';
import { jwtKey } from 'Root/config';

class JWT {
  constructor(key) {
    this.key = key;
  }

  sign(data) {
    return jwt.sign(data, this.key);
  }

  verify(token) {
    try {
      return jwt.verify(token, this.key);
    } catch (error) {
      return null;
    }
  }
}

export default new JWT(jwtKey);
