import desktop from '../../../Orbit-Personal-Tokens/dist/css/platforms/desktop/variables.css?url';
import ipad from '../../../Orbit-Personal-Tokens/dist/css/platforms/ipad/variables.css?url';
import web from '../../../Orbit-Personal-Tokens/dist/css/platforms/web/variables.css?url';

export type OrbitPlatformId = 'web' | 'ipad' | 'desktop';

export const ORBIT_PLATFORMS: { value: OrbitPlatformId; title: string }[] = [
  { value: 'web', title: 'Web' },
  { value: 'ipad', title: 'iPad' },
  { value: 'desktop', title: 'Desktop' },
];

export const ORBIT_PLATFORM_STYLES: Record<OrbitPlatformId, string> = {
  web,
  ipad,
  desktop,
};

export const DEFAULT_ORBIT_PLATFORM: OrbitPlatformId = 'web';

const PLATFORM_LINK_ID = 'orbit-storybook-platform';

export function applyOrbitPlatform(platformId: string): void {
  const href =
    ORBIT_PLATFORM_STYLES[platformId as OrbitPlatformId] ??
    ORBIT_PLATFORM_STYLES[DEFAULT_ORBIT_PLATFORM];

  let link = document.getElementById(PLATFORM_LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = PLATFORM_LINK_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  if (link.href !== href) {
    link.href = href;
  }
}
