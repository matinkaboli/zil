import pureToken from 'Root/utils/pureToken';

export default async (req, res, next) => {
  if (!await pureToken(req.headers.authorization)) {
    return next();
  }

  return res.status(401).json({
    description: 'You cannot do that while you have logged in.',
  });
};
