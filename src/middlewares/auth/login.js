import jwt from 'Root/utils/jwt';

export default async (req, res, next) => {
  if (!await jwt.verify(req.headers['x-access-token'])) {
    return next();
  }

  return res.json({
    statusCode: 401,
    description: 'You cannot do that while you have logged in.',
  });
};
