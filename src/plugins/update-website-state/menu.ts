import prompt from 'custom-electron-prompt';

import promptOptions from '@/providers/prompt-options';

import type { MenuContext } from '@/types/contexts';
import type { MenuTemplate } from '@/menu';
import type { UpdateWebsiteStateConfig } from '@/plugins/update-website-state/index';

export const onMenu = ({
  window,
  getConfig,
  setConfig,
}: MenuContext<UpdateWebsiteStateConfig>): MenuTemplate => {
  return [
    {
      label: 'Socket.IO Url',
      type: 'normal',
      async click() {
        const config = await getConfig();

        const newSocketIOUrl =
          (await prompt(
            {
              title: 'Socket.IO Url',
              label: 'Please input bellow your Socket.IO server url',
              value: config.socketIOUrl,
              type: 'input',
              width: 380,
              ...promptOptions(),
            },
            window,
          )) ?? '';

        setConfig({ ...config, socketIOUrl: newSocketIOUrl });
      },
    },
    {
      label: 'Secret key',
      type: 'normal',
      async click() {
        const config = await getConfig();

        const newSecretKey =
          (await prompt(
            {
              title: 'Secret key',
              value: config.secretKey,
              type: 'input',
              width: 380,
              ...promptOptions(),
            },
            window,
          )) ?? '';

        setConfig({ ...config, secretKey: newSecretKey });
      },
    },
  ];
};
