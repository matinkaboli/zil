import {
  GraphQLFloat,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Delivery',
  fields: () => ({
    lat: {
      type: GraphQLFloat,
    },
    lng: {
      type: GraphQLFloat,
    },
    time: {
      type: GraphQLString,
    },
    address: {
      type: GraphQLString,
    },
  }),
});
