import authenticator from 'otplib/authenticator';
import crypto from 'crypto';

import { otpSecret } from 'Root/config';

authenticator.options = { crypto };

class OTP {
  constructor(secret) {
    this.secret = secret;
  }

  generate() {
    return authenticator.generate(this.secret + authenticator.generateSecret());
  }
}

export default new OTP(otpSecret);
