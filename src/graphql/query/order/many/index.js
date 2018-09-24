import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import OrderType from 'Root/graphql/types/Order';
import resolve from './resolve';

export default {
  type: new GraphQLList(OrderType),
  args: {
    shop: {
      type: GraphQLID,
    },
    page: {
      type: GraphQLInt,
    },
    user: {
      type: GraphQLID,
    },
    status: {
      type: GraphQLString,
    },
  },
  resolve,
};
