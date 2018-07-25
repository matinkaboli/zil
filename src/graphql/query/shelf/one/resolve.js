import Shelf from 'Root/models/Shelf';

export default async (parent, args) => {
  const query = {};

  if (args._id) {
    query._id = args._id;
  }

  if (args.isbn) {
    query.isbn = args.isbn;
  }

  const product = await Shelf.findOne(query);

  return product;
};
