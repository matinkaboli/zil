import Product from 'Root/models/Product';

export default async (parent, args) => {
  const product = await Product.findById(args._id);

  return product;
};
