import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

import UserType from './User';
import ShopType from './Shop';
import DeliveryType from './Delivery';
import OrderListType from './OrderList';
import userResolve from './resolves/order/user';
import shopResolve from './resolves/order/shop';
import orderListResolve from './resolves/order/order-list';

export default new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    shop: {
      type: ShopType,
      resolve: shopResolve,
    },
    user: {
      type: UserType,
      resolve: userResolve,
    },
    factor: {
      type: GraphQLInt,
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
      type: new GraphQLList(OrderListType),
      args: {
        page: {
          type: GraphQLInt,
        },
      },
      resolve: orderListResolve,
    },
  }),
});
