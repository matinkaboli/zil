import page from 'Root/utils/page';
import Follow from 'Root/models/Follow';
import logged from 'Root/middlewares/gql/logged';

export default async (parent, args, context) => {
  const _id = await logged(context.req.headers.authorization);

  const query = { user: _id };

  let followsList;

  if (args.page) {
    const [skip, limit] = page(args.page);
    const follows = await Follow
      .find(query)
      .populate('shop')
      .skip(skip)
      .limit(limit);

    followsList = follows;
  } else {
    const follows = await Follow
      .find(query)
      .populate('shop');

    followsList = follows;
  }

  const shops = [];

  for (const v of followsList) {
    shops.push(v.shop);
  }

  return shops;
};
