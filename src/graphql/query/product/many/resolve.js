import Product from 'Root/models/Product';

export default async (parent, args) => {
  if (args.isbn) {
    const products = await Product.find({ isbn: args.isbn });

    return products;
  }

  if (args.manufacturer) {
    const products = await Product.find({ manufacturer: args.manufacturer });

    return products;
  }

  return [];
};
