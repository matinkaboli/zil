import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

import UserType from './User';
import ShowcaseType from './Showcase';
import LocationType from './Location';
import showcaseResolve from './resolves/showcase';
import showcasesResolve from './resolves/showcases';


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
