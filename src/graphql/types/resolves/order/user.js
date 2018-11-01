import User from 'Root/models/User';

export default async parent => {
  const user = await User.findById(parent.user);

  return user;
};
