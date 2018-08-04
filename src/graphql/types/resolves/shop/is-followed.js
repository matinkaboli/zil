import Follow from 'Root/models/Follow';

export default async (parent, args) => {
  const follow = await Follow.findOne({
    user: args._id,
    shop: parent._id,
  });

  return !!follow;
};
