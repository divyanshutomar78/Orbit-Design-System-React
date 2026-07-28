export type OrbitPlatformId = 'web' | 'ipad' | 'desktop';

export const ORBIT_PLATFORMS: { value: OrbitPlatformId; title: string }[] = [
  { value: 'web', title: 'Web' },
  { value: 'ipad', title: 'iPad' },
  { value: 'desktop', title: 'Desktop' },
];

// Served via Storybook `staticDirs`:
// `{ from: '../../../node_modules/orbit-ds-variables/dist/css/platforms', to: '/orbit-platforms' }`.
export const ORBIT_PLATFORM_STYLES: Record<OrbitPlatformId, string> = {
  web: '/orbit-platforms/web/variables.css',
  ipad: '/orbit-platforms/ipad/variables.css',
  desktop: '/orbit-platforms/desktop/variables.css',
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
