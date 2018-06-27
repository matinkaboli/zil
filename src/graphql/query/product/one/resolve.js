import Product from 'Root/models/Product';

export default async (parent, args) => {
  const query = {};

  if (args.isbn) {
    query.isbn = args.isbn;
  }

  if (args._id) {
    query._id = args._id;
  }

  const product = await Product.findOne(query);

  return product;
};
