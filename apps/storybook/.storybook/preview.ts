import type { Preview } from '@storybook/angular';

import { withOrbitTokens } from './OrbitTokensDecorator';
import { DEFAULT_ORBIT_PLATFORM, ORBIT_PLATFORMS } from './orbitPlatforms';
import { DEFAULT_ORBIT_THEME, ORBIT_THEMES } from './orbitThemes';

// Font family variable is provided via a <style> tag in `preview-head.html`
// (webpack's default Angular builder config has no generic CSS-import loader).

const preview: Preview = {
  globalTypes: {
    orbitTheme: {
      name: 'Orbit Theme',
      description: 'Color theme from orbit-ds-variables (dist/css/themes)',
      defaultValue: DEFAULT_ORBIT_THEME,
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        dynamicTitle: true,
        items: ORBIT_THEMES.map(({ value, title }) => ({ value, title })),
      },
    },
    orbitPlatform: {
      name: 'Orbit Platform',
      description: 'Platform sizing tokens from orbit-ds-variables (dist/css/platforms)',
      defaultValue: DEFAULT_ORBIT_PLATFORM,
      toolbar: {
        title: 'Platform',
        icon: 'browser',
        dynamicTitle: true,
        items: ORBIT_PLATFORMS.map(({ value, title }) => ({ value, title })),
      },
    },
  },
  decorators: [withOrbitTokens],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: '#e8e8e8' },
        { name: 'dark', value: '#1d1d1d' },
        { name: 'light', value: '#f7f7f7' },
      ],
    },
  },
};

export default preview;
