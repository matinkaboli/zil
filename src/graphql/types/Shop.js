import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

import UserType from './User';
import FollowType from './Follow';
import ShowcaseType from './Showcase';
import LocationType from './Location';
import showcaseResolve from './resolves/showcase';
import showcasesResolve from './resolves/showcases';
import followersResolve from './resolves/followers';

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
      args: {
        page: {
          type: GraphQLInt,
        },
      },
      resolve: followersResolve,
      type: new GraphQLList(FollowType),
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
