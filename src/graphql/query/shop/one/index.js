import { GraphQLID } from 'graphql';

import ShopType from 'Root/graphql/types/Shop';
import resolve from './resolve';

export default {
  type: ShopType,
  args: {
    _id: {
      type: GraphQLID,
    },
  },
  resolve,
};
