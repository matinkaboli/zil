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
    photo: {
      type: GraphQLString,
    },
    expiration: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    manufacturer: {
      type: GraphQLString,
    },
  }),
});
