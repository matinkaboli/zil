import { createHmac } from 'crypto';

export default (text, key) => createHmac('sha512', key).update(text).digest('hex');
