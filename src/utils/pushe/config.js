import { pushe } from 'Root/config';

export default {
  body: {
    applications: [pushe.app],
    action: {
      url: 'sms:شماره پیامک?body=متن پیام',
      action_type: 'U',
    },
  },
};
