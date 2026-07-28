import type { Decorator } from '@storybook/angular';

import { applyOrbitPlatform, DEFAULT_ORBIT_PLATFORM, type OrbitPlatformId } from './orbitPlatforms';
import { applyOrbitTheme, DEFAULT_ORBIT_THEME, type OrbitThemeId } from './orbitThemes';

export const withOrbitTokens: Decorator = (storyFn, context) => {
  const theme = (context.globals['orbitTheme'] as OrbitThemeId | undefined) ?? DEFAULT_ORBIT_THEME;
  const platform =
    (context.globals['orbitPlatform'] as OrbitPlatformId | undefined) ?? DEFAULT_ORBIT_PLATFORM;

  applyOrbitTheme(theme);
  applyOrbitPlatform(platform);

  return storyFn();
};
