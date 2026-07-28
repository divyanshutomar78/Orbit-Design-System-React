import type { StorybookConfig } from '@storybook/angular';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  staticDirs: [
    {
      from: '../../../node_modules/orbit-ds-variables/dist/css/primitives',
      to: '/orbit-primitives',
    },
    {
      from: '../../../node_modules/orbit-ds-variables/dist/css/themes',
      to: '/orbit-themes',
    },
    {
      from: '../../../node_modules/orbit-ds-variables/dist/css/platforms',
      to: '/orbit-platforms',
    },
  ],
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...(config.resolve.alias ?? {}),
        'orbit-ds-components': path.resolve(dirname, '../../../packages/components/src'),
      };
    }
    return config;
  },
};

export default config;
