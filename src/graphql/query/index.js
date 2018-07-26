import { GraphQLObjectType } from 'graphql';

import shop from './shop/one';
import user from './user/one';
import shelf from './shelf/one';
import shelves from './shelf/many';
import myShops from './shop/mine';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    shop,
    user,
    shelf,
    shelves,
    myShops,
  },
});
