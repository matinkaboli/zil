import page from 'Root/utils/page';
import Product from 'Root/models/Product';

export default async (parent, args) => {
  const query = {};

  if (args.manufacturer) {
    query.manufacturer = args.manufacturer;
  }

  if (args.page) {
    const [skip, limit] = page(args.page);
    const products = await Product.find(query).skip(skip).limit(limit);

    return products;
  }

  const products = await Product.find(query);

  return products;
};
