import Shop from 'Root/models/Shop';
import logged from 'Root/middlewares/gql/logged';

export default async (parent, args, context) => {
  const _id = await logged(context.req.headers['x-access-token']);
  const shop = await Shop.find({ admin: _id }).populate('admin').exec();

  return shop;
};
