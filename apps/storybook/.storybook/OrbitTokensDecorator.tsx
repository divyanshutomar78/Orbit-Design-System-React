import type { Decorator } from '@storybook/react';
import { useLayoutEffect, type ReactNode } from 'react';

import {
  applyOrbitPlatform,
  DEFAULT_ORBIT_PLATFORM,
  type OrbitPlatformId,
} from './orbitPlatforms';
import {
  applyOrbitTheme,
  DEFAULT_ORBIT_THEME,
  type OrbitThemeId,
} from './orbitThemes';

function OrbitTokensShell({
  theme,
  platform,
  children,
}: {
  theme: OrbitThemeId;
  platform: OrbitPlatformId;
  children: ReactNode;
}) {
  applyOrbitTheme(theme);
  applyOrbitPlatform(platform);

  useLayoutEffect(() => {
    applyOrbitTheme(theme);
    applyOrbitPlatform(platform);
  }, [theme, platform]);

  return <>{children}</>;
}

export const withOrbitTokens: Decorator = (Story, context) => {
  const theme =
    (context.globals.orbitTheme as OrbitThemeId | undefined) ??
    DEFAULT_ORBIT_THEME;
  const platform =
    (context.globals.orbitPlatform as OrbitPlatformId | undefined) ??
    DEFAULT_ORBIT_PLATFORM;

  return (
    <OrbitTokensShell theme={theme} platform={platform}>
      <Story />
    </OrbitTokensShell>
  );
};
