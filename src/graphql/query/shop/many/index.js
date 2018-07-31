import { GraphQLList, GraphQLFloat } from 'graphql';

import ShopType from 'Root/graphql/types/Shop';
import resolve from './resolve';

export default {
  type: new GraphQLList(ShopType),
  args: {
    minLat: {
      type: GraphQLFloat,
    },
    maxLat: {
      type: GraphQLFloat,
    },
    minLng: {
      type: GraphQLFloat,
    },
    maxLng: {
      type: GraphQLFloat,
    },
  },
  resolve,
};
