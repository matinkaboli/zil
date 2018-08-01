import page from 'Root/utils/page';
import OrderList from 'Root/models/OrderList';

export default async (parent, args) => {
  const query = { order: parent._id };

  if (args.page) {
    const [skip, limit] = page(args.page);
    const orderLists = await OrderList.find(query).skip(skip).limit(limit);

    return orderLists;
  }

  const orderLists = await OrderList.find(query);

  return orderLists;
};
