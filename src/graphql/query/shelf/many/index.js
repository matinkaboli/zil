import {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import ShelfType from 'Root/graphql/types/Shelf';
import resolve from './resolve';

export default {
  type: new GraphQLList(ShelfType),
  args: {
    page: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    manufacturer: {
      type: GraphQLString,
    },
  },
  resolve,
};
