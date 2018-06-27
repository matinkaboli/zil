import {
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Product',
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
    photos: {
      type: new GraphQLList(GraphQLString),
    },
  }),
});
