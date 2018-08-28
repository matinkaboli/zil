import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
} from 'graphql';

import UserType from './User';
import OrderType from './Order';
import FollowType from './Follow';
import ShowcaseType from './Showcase';
import LocationType from './Location';
import ordersResolve from './resolves/shop/orders';
import showcaseResolve from './resolves/shop/showcase';
import showcasesResolve from './resolves/shop/showcases';
import followersResolve from './resolves/shop/followers';
import isFollowedResolve from './resolves/shop/is-followed';

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
    orders: {
      type: new GraphQLList(OrderType),
      args: {
        page: {
          type: GraphQLInt,
        },
      },
      resolve: ordersResolve,
    },
    address: {
      type: GraphQLString,
    },
    username: {
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
    isFollowed: {
      args: {
        _id: {
          type: GraphQLID,
        },
      },
      resolve: isFollowedResolve,
      type: GraphQLBoolean,
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
