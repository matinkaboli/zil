import page from 'Root/utils/page';
import Follow from 'Root/models/Follow';

export default async (parent, args) => {
  if (args.page) {
    const [skip, limit] = page(args.page);
    const followers = await Follow
      .find({ shop: parent._id })
      .populate('user')
      .skip(skip)
      .limit(limit)
      .exec();

    return followers;
  }

  const followers = await Follow
    .find({ shop: parent._id })
    .populate('user')
    .exec();

  return followers;
};
