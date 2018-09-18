import Shop from 'Root/models/Shop';

export default async parent => {
  const shop = await Shop.findById(parent.shop);

  return shop;
};
