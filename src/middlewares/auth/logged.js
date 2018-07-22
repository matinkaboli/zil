import jwt from 'Root/utils/jwt';

export default async (req, res, next) => {
  const token = await jwt.verify(req.headers['x-access-token']);

  if (token) {
    req.user = token._id;

    return next();
  }

  return res.json({
    entity: 'token',
    statusCode: 401,
    description: 'JWT token is missing or wrong or expired.',
  });
};
