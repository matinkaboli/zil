import User from 'Root/models/User';

export default async (parent, args) => {
  const user = await User.findById(args._id).lean();

  user.hasPassword = !!user.password;

  return user;
};
