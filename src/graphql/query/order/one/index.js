import { GraphQLID } from 'graphql';

import OrderType from 'Root/graphql/types/Order';
import resolve from './resolve';

export default {
  type: OrderType,
  args: {
    _id: {
      type: GraphQLID,
    },
  },
  resolve,
};
