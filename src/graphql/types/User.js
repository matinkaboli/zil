import {
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLString,
    },
    verified: {
      type: GraphQLBoolean,
    },
    createdAt: {
      type: GraphQLString,
    },
    shops: {
      type: new GraphQLList(GraphQLID),
    },
  }),
});
