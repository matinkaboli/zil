import page from 'Root/utils/page';
import search from 'Root/utils/search';
import Product from 'Root/models/Shelf';

export default async (parent, args) => {
  const query = {
    name: search(args.name),
    manufacturer: search(args.manufacturer),
  };

  if (args.page) {
    const [skip, limit] = page(args.page);
    const shelfs = await Product.find(query).skip(skip).limit(limit);

    return shelfs;
  }

  const shelfs = await Product.find(query);

  return shelfs;
};
