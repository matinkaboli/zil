import Showcase from 'Root/models/Showcase';

export default async (parent, args) => {
  const showcase = await Showcase
    .findOne({ shop: parent._id, _id: args._id })
    .populate('shelf')
    .exec();

  return showcase;
};
