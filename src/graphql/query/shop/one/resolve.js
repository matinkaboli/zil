import Shop from 'Root/models/Shop';

export default async (parent, args) => {
  const shop = await Shop
    .findById(args._id)
    .populate('user');

  return shop;
};
