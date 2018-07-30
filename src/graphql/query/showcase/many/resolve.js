import Showcase from 'Root/models/Showcase';

export default async (parent, args) => {
  const showcase = await Showcase.find({ shop: args.shopId });

  return showcase;
};
