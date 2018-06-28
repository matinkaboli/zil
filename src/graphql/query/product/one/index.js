import { GraphQLID, GraphQLString } from 'graphql';

import ProductType from 'Root/graphql/types/Product';
import resolve from './resolve';

export default {
  type: ProductType,
  args: {
    _id: {
      type: GraphQLID,
    },
    isbn: {
      type: GraphQLString,
    },
  },
  resolve,
};
