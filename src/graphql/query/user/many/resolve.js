import User from 'Root/models/User';

export default async () => {
  const users = await User.find();

  return users;
};
