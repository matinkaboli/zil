import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

import UserType from './User';

const LocationType = new GraphQLObjectType({
  name: 'Location',
  fields: () => ({
    lat: {
      type: GraphQLFloat,
    },
    lng: {
      type: GraphQLFloat,
    },
  }),
});

export default new GraphQLObjectType({
  name: 'Shop',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    admin: {
      type: UserType,
    },
    photos: {
      type: new GraphQLList(GraphQLString),
    },
    address: {
      type: GraphQLString,
    },
    location: {
      type: LocationType,
    },
    createdAt: {
      type: GraphQLString,
    },
    followers: {
      type: new GraphQLList(GraphQLID),
    },
    description: {
      type: GraphQLString,
    },
    minimumOrderPrice: {
      type: GraphQLInt,
    },
    maximumDeliveryTime: {
      type: GraphQLInt,
    },
  }),
});
