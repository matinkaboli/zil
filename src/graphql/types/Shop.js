import {
  GraphQLID,
  GraphQLFloat,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

import UserType from './User';

export default new GraphQLObjectType({
  name: 'Shop',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    lat: {
      type: GraphQLFloat,
    },
    lng: {
      type: GraphQLFloat,
    },
    name: {
      type: GraphQLString,
    },
    avatar: {
      type: GraphQLString,
    },
    admin: {
      type: UserType,
    },
    address: {
      type: GraphQLString,
    },
    createdAt: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
  }),
});
