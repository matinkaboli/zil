import { GraphQLID } from 'graphql';

import ShowcaseType from 'Root/graphql/types/Showcase';
import resolve from './resolve';

export default {
  type: ShowcaseType,
  args: {
    _id: {
      type: GraphQLID,
    },
  },
  resolve,
};
