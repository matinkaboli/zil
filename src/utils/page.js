export default page => {
  const multi = (page - 1) * 10;

  return [multi, multi + 10];
};
