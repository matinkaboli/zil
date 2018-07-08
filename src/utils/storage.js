import multer from 'multer';

import { uploadDir } from 'Root/config';
import random from './random';

export default multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  async filename(req, file, cb) {
    const rand = await random();
    const extension = file.mimetype.split('/')[1];

    if (extension === 'jpeg' || extension === 'png' || extension === 'jpg') {
      return cb(null, `${rand}${Date.now}.${extension}`);
    }

    return cb(new Error('Not an image'));
  },
});
