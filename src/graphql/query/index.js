import { GraphQLObjectType } from 'graphql';

import shop from './shop/one';
import user from './user/one';
import order from './order/one';
import shops from './shop/many';
import shelf from './shelf/one';
import orders from './order/many';
import myShops from './shop/mine';
import shelves from './shelf/many';
import showcase from './showcase/one';
import showcases from './showcase/many';
import followedShops from './shop/followedShops';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    shop,
    user,
    shops,
    shelf,
    order,
    orders,
    shelves,
    myShops,
    showcase,
    showcases,
    followedShops,
  },
});
