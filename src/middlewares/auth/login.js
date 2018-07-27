import jwt from 'Root/utils/jwt';

export default async (req, res, next) => {
  if (!await jwt.verify(req.headers['x-access-token'])) {
    return next();
  }

  return res.status(401).json({
    description: 'You cannot do that while you have logged in.',
  });
};
