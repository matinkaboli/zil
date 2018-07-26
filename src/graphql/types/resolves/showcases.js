import page from 'Root/utils/page';
import Showcase from 'Root/models/Showcase';

export default async (parent, args) => {
  const query = { shop: parent._id };

  if (args.page) {
    const [skip, limit] = page(args.page);
    const showcases = await Showcase
      .find(query)
      .populate('shelf')
      .skip(skip)
      .limit(limit)
      .exec();

    return showcases;
  }

  const showcases = await Showcase
    .find(query)
    .populate('shelf')
    .exec();

  return showcases;
};
