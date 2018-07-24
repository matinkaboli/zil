import sanitize from 'mongo-sanitize';

export default value => {
  let v = sanitize(value);

  if (typeof v === 'object') {
    v = JSON.stringify(v);
  }

  return v;
};
