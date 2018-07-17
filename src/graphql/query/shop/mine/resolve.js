import Shop from 'Root/models/Shop';
import logged from 'Root/middlewares/gql/logged';

export default async (parent, args, context) => {
  logged(context.req.headers['x-access-token']).then(async _id => {
    const shop = await Shop.find({ admin: _id });

    return shop;
  }).catch(() => null);
};
