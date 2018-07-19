import page from 'Root/utils/page';
import search from 'Root/utils/search';
import Shelf from 'Root/models/Shelf';

export default async (parent, args) => {
  const query = {
    verified: true,
    name: search(args.name),
    manufacturer: search(args.manufacturer),
  };

  if (args.page) {
    const [skip, limit] = page(args.page);
    const shelfs = await Shelf.find(query).skip(skip).limit(limit);

    return shelfs;
  }

  const shelfs = await Shelf.find(query);

  return shelfs;
};
