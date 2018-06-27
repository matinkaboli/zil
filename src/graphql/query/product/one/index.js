import { GraphQLID } from 'graphql';

import ProductSchema from 'Root/graphql/types/Product';
import resolve from './resolve';

export default {
  type: ProductSchema,
  args: {
    _id: {
      type: GraphQLID,
    },
  },
  resolve,
};
