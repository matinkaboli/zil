import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
} from 'graphql';

import OrderType from './Order';
import ShowcaseType from './Showcase';
import orderResolve from './resolves/order-list/order';
import showcaseResolve from './resolves/order-list/showcase';

export default new GraphQLObjectType({
  name: 'OrderList',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    order: {
      type: OrderType,
      resolve: orderResolve,
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
