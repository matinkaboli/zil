import Order from 'Root/models/Order';

export default async (parent, args) => {
  const order = await Order.findById(args._id);

  return order;
};
