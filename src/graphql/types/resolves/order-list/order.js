import Order from 'Root/models/Order';

export default async parent => {
  const order = await Order.findById(parent.order);

  return order;
};
