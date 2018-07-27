import User from 'Root/models/User';

export default async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    if (user.role === 1) {
      return next();
    }

    return res.status(403).json({
      description: 'You don\'t have permission to do this.',
    });
  } catch (error) {
    return res.status(403).json({
      description: 'You don\'t have permission to do this.',
    });
  }
};
