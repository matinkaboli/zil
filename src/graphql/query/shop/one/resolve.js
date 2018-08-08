import Shop from 'Root/models/Shop';

export default async (parent, args) => {
  const query = {};

  if (args._id) {
    query._id = args._id;
  }

  if (args.username) {
    query.username = args.username.toLowerCase();
  }

  const shop = await Shop.findOne(query).populate('admin').exec();

  return shop;
};
