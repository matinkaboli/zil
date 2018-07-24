import {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    role: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    score: {
      type: GraphQLInt,
    },
    phone: {
      type: GraphQLString,
    },
    createdAt: {
      type: GraphQLString,
    },
    passwordHint: {
      type: GraphQLString,
    },
  }),
});
