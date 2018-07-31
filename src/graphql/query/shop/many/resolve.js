import Shop from 'Root/models/Shop';

export default async (parent, args) => {
  const query = {};

  if (args.minLat) {
    query['location.lat'] = query['location.lat'] || {};

    query['location.lat'].$gte = args.minLat;
  }

  if (args.maxLat) {
    query['location.lat'] = query['location.lat'] || {};

    query['location.lat'].$lte = args.maxLat;
  }

  if (args.minLng) {
    query['location.lng'] = query['location.lng'] || {};

    query['location.lng'].$gte = args.minLng;
  }

  if (args.maxLng) {
    query['location.lng'] = query['location.lng'] || {};

    query['location.lng'].$lte = args.maxLng;
  }

  const shop = await Shop.find(query);

  return shop;
};
