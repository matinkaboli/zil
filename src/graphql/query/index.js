import { GraphQLObjectType } from 'graphql';

import shop from './shop/one';
import user from './user/one';
import myShops from './shop/mine';
import users from './user/many';
import shelf from './shelf/one';
import shelfs from './shelf/many';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    shop,
    user,
    users,
    shelf,
    shelfs,
    myShops,
  },
});
