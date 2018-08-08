import {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

import UserType from './User';
import ShopType from './Shop';
import DeliveryType from './Delivery';
import OrderListType from './OrderList';
import orderListResolve from './resolves/order/order-list';

export default new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    shop: {
      type: ShopType,
    },
    user: {
      type: UserType,
    },
    status: {
      type: GraphQLString,
    },
    delivery: {
      type: DeliveryType,
    },
    createdAt: {
      type: GraphQLString,
    },
    orderLists: {
      type: OrderListType,
      args: {
        page: {
          type: GraphQLInt,
        },
      },
      resolve: orderListResolve,
    },
  }),
});
