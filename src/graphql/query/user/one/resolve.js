import User from 'Root/models/User';

export default async (parent, args) => {
  const user = await User.findById(args._id);

  return user;
};
