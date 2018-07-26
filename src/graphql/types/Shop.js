import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

import UserType from './User';
import ShowcaseType from './Showcase';
import showcaseResolve from './resolves/showcase';
import showcasesResolve from './resolves/showcases';

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
    showcases: {
      type: new GraphQLList(ShowcaseType),
      args: {
        page: {
          type: GraphQLInt,
        },
      },
      resolve: showcasesResolve,
    },
    showcase: {
      type: ShowcaseType,
      args: {
        _id: {
          type: GraphQLID,
        },
      },
      resolve: showcaseResolve,
    },
    description: {
      type: GraphQLString,
    },
    showcaseCount: {
      type: GraphQLInt,
    },
    followersCount: {
      type: GraphQLInt,
    },
    minimumOrderPrice: {
      type: GraphQLInt,
    },
    maximumDeliveryTime: {
      type: GraphQLInt,
    },
  }),
});
