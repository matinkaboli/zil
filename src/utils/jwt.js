import jwt from 'jsonwebtoken';

export default class {
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
