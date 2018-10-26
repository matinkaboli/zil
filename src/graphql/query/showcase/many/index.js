import { GraphQLID, GraphQLInt, GraphQLList } from 'graphql';

import ShowcaseType from 'Root/graphql/types/Showcase';
import resolve from './resolve';

export default {
  type: new GraphQLList(ShowcaseType),
  args: {
    shopId: {
      type: GraphQLID,
    },
    page: {
      type: GraphQLInt,
    },
  },
  resolve,
};
