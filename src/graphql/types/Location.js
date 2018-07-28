import { GraphQLFloat, GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
  name: 'Location',
  fields: () => ({
    lat: {
      type: GraphQLFloat,
    },
    lng: {
      type: GraphQLFloat,
    },
  }),
});
