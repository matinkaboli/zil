import User from 'Root/models/User';

export default async (parent, args) => {
  let user;

  if (args._id) {
    user = await User.findById(args._id).lean();
  } else if (args.phone) {
    user = await User.findOne({ phone: args.phone }).lean();
  }

  if (user) {
    user.hasPassword = !!user.password;

    return user;
  }

  return null;
};
