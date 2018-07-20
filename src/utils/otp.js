import authenticator from 'otplib/authenticator';
import crypto from 'crypto';

import { otpSecret } from 'Root/config';

authenticator.options = {
  crypto,
  step: 240,
};

class OTP {
  constructor(secret) {
    this.secret = secret;
  }

  generate() {
    return authenticator.generate(this.secret).toString();
  }

  verify(token) {
    return authenticator.verify({
      token,
      secret: this.secret,
    });
  }
}

export default new OTP(otpSecret);
