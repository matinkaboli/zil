import rn from 'random-number';

export default () => rn({
  min: 100000,
  max: 999999,
  integer: true,
});
