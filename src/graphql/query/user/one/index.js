import { GraphQLID } from 'graphql';

import UserType from 'Root/graphql/types/User';
import resolve from './resolve';

export default {
  type: UserType,
  args: {
    _id: {
      type: GraphQLID,
    },
  },
  resolve,
};
