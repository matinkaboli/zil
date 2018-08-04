import {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
} from 'graphql';

import shopResolve from './resolves/shop';
import ShowType from './Shop';
import ShelfType from './Shelf';

export default new GraphQLObjectType({
  name: 'Showcase',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    shop: {
      type: ShowType,
      resolve: shopResolve,
    },
    price: {
      type: GraphQLInt,
    },
    shelf: {
      type: ShelfType,
    },
    createdAt: {
      type: GraphQLString,
    },
    available: {
      type: GraphQLBoolean,
    },
    discountedPrice: {
      type: GraphQLInt,
    },
  }),
});
