import Showcase from 'Root/models/Showcase';

export default async parent => {
  const showcase = await Showcase.findById(parent.showcase);

  return showcase;
};
