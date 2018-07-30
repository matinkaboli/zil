import { GraphQLObjectType } from 'graphql';

import shop from './shop/one';
import user from './user/one';
import shelf from './shelf/one';
import myShops from './shop/mine';
import shelves from './shelf/many';
import showcase from './showcase/one';
import showcases from './showcase/many';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    shop,
    user,
    shelf,
    shelves,
    myShops,
    showcase,
    showcases,
  },
});
