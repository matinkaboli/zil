import { GraphQLObjectType } from 'graphql';

import oneProduct from './product/one';
import manyProducts from './product/many';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    product: oneProduct,
    products: manyProducts,
  },
});
