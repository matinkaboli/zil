import jwt from 'Root/utils/jwt';

export default (req, res, next) => {
  if (!jwt.verify(req.headers['x-access-token'])._id) {
    return next();
  }

  return res.json({
    statusCode: 401,
    description: 'You cannot do that while you have logged in.',
  });
};
