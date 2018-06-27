import { GraphQLObjectType } from 'graphql';

import product from './product';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    product,
  },
});
