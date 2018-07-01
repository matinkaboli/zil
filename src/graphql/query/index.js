import { GraphQLObjectType } from 'graphql';

import oneShop from './shop/one';
import oneUser from './user/one';
import manyUsers from './user/many';
import oneProduct from './product/one';
import manyProducts from './product/many';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    shop: oneShop,
    user: oneUser,
    users: manyUsers,
    product: oneProduct,
    products: manyProducts,
  },
});
