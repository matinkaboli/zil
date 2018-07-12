import page from 'Root/utils/page';
import search from 'Root/utils/search';
import Product from 'Root/models/Product';

export default async (parent, args) => {
  const query = {
    name: search(args.search),
    manufacturer: search(args.manufacturer),
  };

  if (args.page) {
    const [skip, limit] = page(args.page);
    const products = await Product.find(query).skip(skip).limit(limit);

    return products;
  }

  const products = await Product.find(query);

  return products;
};
