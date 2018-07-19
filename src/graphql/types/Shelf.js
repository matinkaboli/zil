import {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Shelf',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    isbn: {
      type: GraphQLString,
    },
    expiration: {
      type: GraphQLString,
    },
    manufacturer: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    photo: {
      type: GraphQLString,
    },
  }),
});
