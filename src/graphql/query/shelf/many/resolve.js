import page from 'Root/utils/page';
import search from 'Root/utils/search';
import Shelf from 'Root/models/Shelf';

export default async (parent, args) => {
  const query = {};

  if (args.name) {
    query.name = search(args.name);
  }

  if (args.manufacturer) {
    query.manufacturer = search(args.manufacturer);
  }

  if (args.page) {
    const [skip, limit] = page(args.page);
    const shelves = await Shelf.find(query).skip(skip).limit(limit);

    return shelves;
  }

  const shelves = await Shelf.find(query);

  return shelves;
};
