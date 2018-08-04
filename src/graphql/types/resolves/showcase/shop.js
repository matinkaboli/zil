import Shop from 'Root/models/Shop';

export default async parent => {
  const shop = await Shop.findOne({ _id: parent.shop });

  return shop;
};
