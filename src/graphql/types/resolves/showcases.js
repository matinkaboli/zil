import page from 'Root/utils/page';
import Showcase from 'Root/models/Showcase';

export default async (parent, args) => {
  const query = { shop: parent._id };

  if (args.page) {
    const [skip, limit] = page(args.page);
    const showcases = await Showcase.find(query).skip(skip).limit(limit);

    return showcases;
  }

  const showcases = await Showcase.find(query);

  return showcases;
};
