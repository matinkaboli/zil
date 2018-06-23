import rn from 'random-number';

export default () => rn({
  integer: true,
  min: 100000,
  max: 999999,
});
