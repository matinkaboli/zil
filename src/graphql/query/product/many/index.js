import {
  GraphQLList,
  GraphQLString,
} from 'graphql';

import ProductSchema from 'Root/graphql/types/Product';
import resolve from './resolve';

export default {
  type: new GraphQLList(ProductSchema),
  args: {
    manufacturer: {
      type: GraphQLString,
    },
  },
  resolve,
};
