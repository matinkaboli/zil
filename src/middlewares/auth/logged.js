import jwt from 'Root/utils/jwt';
import pureToken from 'Root/utils/pureToken';

export default async (req, res, next) => {
  const token = await jwt.verify(pureToken(req.headers.authorization));

  if (token) {
    req.user = token._id;

    return next();
  }

  return res.status(401).json({
    entity: 'token',
    description: 'JWT token is missing or wrong or expired.',
  });
};
