import {
  GraphQLList,
  GraphQLString,
} from 'graphql';

import ProductType from 'Root/graphql/types/Product';
import resolve from './resolve';

export default {
  type: new GraphQLList(ProductType),
  args: {
    manufacturer: {
      type: GraphQLString,
    },
  },
  resolve,
};
