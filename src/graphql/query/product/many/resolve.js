import Product from 'Root/models/Product';

export default async (parent, args) => {
  const query = {};

  if (args.manufacturer) {
    query.manufacturer = args.manufacturer;
  }

  const products = await Product.find(query);

  return products;
};
