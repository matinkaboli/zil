import Shelf from 'Root/models/Shelf';

export default async (parent, args) => {
  const query = {};

  if (args.isbn) {
    query.isbn = args.isbn;
  }

  if (args._id) {
    query._id = args._id;
  }

  const product = await Shelf.findOne(query);

  return product;
};
