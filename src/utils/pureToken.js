export default (token) => {
  if (!token) {
    return false;
  }

  if (!token.includes('Bearer ')) {
    return false;
  }

  return token.replace('Bearer ', '').trim();
};
