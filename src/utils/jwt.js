import jwt from 'jsonwebtoken';
import { jwtKey } from 'Root/config';
import Token from 'Root/models/Token';

class JWT {
  constructor(key) {
    this.key = key;
  }

  async sign(data) {
    try {
      const sign = jwt.sign(data, this.key);

      let token = await Token.findOne({ token: sign });

      if (!token) {
        token = new Token({
          token: sign,
          user: data._id,
        });

        await token.save();
      }

      return sign;
    } catch (error) {
      return null;
    }
  }

  async verify(token) {
    try {
      const checkDatabase = await Token.findOne({ token });

      if (!checkDatabase) {
        return null;
      }

      return jwt.verify(token, this.key);
    } catch (error) {
      return null;
    }
  }
}

export default new JWT(jwtKey);
