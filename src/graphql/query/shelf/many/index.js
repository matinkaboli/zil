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
    manufacturer: {
      type: GraphQLString,
    },
    page: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
  },
  resolve,
};
