import jwt from 'Root/utils/jwt';

export default (req, res, next) => {
  const id = jwt.verify(req.headers['x-access-token'])._id;

  if (id) {
    req.user = id;

    return next();
  }

  return res.json({
    statusCode: 401,
    description: 'JWT token is missing or wrong.',
  });
};
