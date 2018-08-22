import { GraphQLInt, GraphQLList } from 'graphql';

import ShopType from 'Root/graphql/types/Shop';
import resolve from './resolve';

export default {
  type: new GraphQLList(ShopType),
  args: {
    page: {
      type: GraphQLInt,
    },
  },
  resolve,
};
