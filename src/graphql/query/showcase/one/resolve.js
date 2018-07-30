import Showcase from 'Root/models/Showcase';

export default async (parent, args) => {
  const showcase = await Showcase.findOne({ _id: args._id });

  return showcase;
};
