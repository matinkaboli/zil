import { GraphQLID, GraphQLInt, GraphQLList } from 'graphql';

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
  },
  resolve,
};
