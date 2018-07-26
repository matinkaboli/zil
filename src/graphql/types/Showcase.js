import {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

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
    discountedPrice: {
      type: GraphQLInt,
    },
  }),
});
