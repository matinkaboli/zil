import page from 'Root/utils/page';
import Order from 'Root/models/Order';

export default async (parent, args) => {
  const query = {
    shop: parent._id,
  };

  if (args.page) {
    const [skip, limit] = page(args.page);
    const orders = await Order.find(query).skip(skip).limit(limit);

    return orders;
  }

  const orders = await Order.find(query);

  return orders;
};
