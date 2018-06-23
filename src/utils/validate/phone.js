export default phone => {
  if (Number.isNaN(phone)) {
    return false;
  }

  if (phone.toString().length !== 10) {
    return false;
  }

  return true;
};
