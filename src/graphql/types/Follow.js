import { GraphQLObjectType } from 'graphql';

import UserType from './User';
import ShopType from './Shop';

export default new GraphQLObjectType({
  name: 'Follow',
  fields: () => ({
    user: {
      type: UserType,
    },
    shop: {
      type: ShopType,
    },
  }),
});
