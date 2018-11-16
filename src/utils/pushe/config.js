import { pushe } from 'Root/config';

export default {
  body: {
    applications: [pushe.app],
    action: {
      url: pushe.app,
      action_type: 'A',
    },
  },
};
