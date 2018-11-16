import { pushe } from 'Root/config';

export default {
  body: {
    applications: [pushe.app],
    action: {
      url: '',
      action_type: 'A',
    },
  },
};
