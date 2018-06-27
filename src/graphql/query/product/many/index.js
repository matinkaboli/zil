import {
  GraphQLList,
  GraphQLString,
} from 'graphql';

import ProductSchema from 'Root/graphql/types/Product';
import resolve from './resolve';

export default {
  type: new GraphQLList(ProductSchema),
  args: {
    isbn: {
      type: GraphQLString,
    },
    manufacturer: {
      type: GraphQLString,
    },
  },
  resolve,
};
