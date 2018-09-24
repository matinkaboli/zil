import page from 'Root/utils/page';
import Order from 'Root/models/Order';

export default async (parent, args) => {
  const query = { shop: args.shop };

  if (args.user) {
    query.user = args.user;
  }

  if (args.status) {
    query.status = args.status;
  }

  if (args.page) {
    const [skip, limit] = page(args.page);
    const orders = await Order.find(query).skip(skip).limit(limit);

    return orders;
  }

  const orders = await Order.find(query);

  return orders;
};
