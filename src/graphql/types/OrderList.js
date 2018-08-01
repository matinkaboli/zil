import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
} from 'graphql';

import OrderType from './Order';
import ShowcaseType from './Showcase';
import showcaseResolve from './resolves/order-list/showcase';

export default new GraphQLObjectType({
  name: 'OrderList',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    order: {
      type: OrderType,
    },
    count: {
      type: GraphQLInt,
    },
    price: {
      type: GraphQLInt,
    },
    showcase: {
      type: ShowcaseType,
      resolve: showcaseResolve,
    },
  }),
});
