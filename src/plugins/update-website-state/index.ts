import { backend } from './backend';
import { onMenu } from './menu';

import { createPlugin } from '@/utils';

export type UpdateWebsiteStateConfig = {
  enabled: boolean;
  socketIOUrl: string;
  secretKey: string;
};

export default createPlugin({
  name: () => 'Website presence updater',
  description: () => 'Plugin for showing current ytm state on website',
  config: {
    enabled: false,
    socketIOUrl: '',
    secretKey: '',
  } as UpdateWebsiteStateConfig,
  menu: onMenu,
  backend,
});
