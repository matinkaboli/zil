import { GraphQLList } from 'graphql';

import UserType from 'Root/graphql/types/User';
import resolve from './resolve';

export default {
  type: new GraphQLList(UserType),
  resolve,
};
