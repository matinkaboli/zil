import { GraphQLID, GraphQLString } from 'graphql';

import ShelfType from 'Root/graphql/types/Shelf';
import resolve from './resolve';

export default {
  type: ShelfType,
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
