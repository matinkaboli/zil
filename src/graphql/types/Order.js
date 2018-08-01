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
      type: GraphQLInt,
    },
    delivery: {
      type: DeliveryType,
    },
    createdAt: {
      type: GraphQLString,
    },
    orderList: {
      type: OrderListType,
    },
    orderLists: {
      type: OrderListType,
    },
  }),
});
