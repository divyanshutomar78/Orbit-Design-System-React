import dGrey from 'orbit-ds-variables/dist/css/themes/d-grey/index.css?url';
import dGreen from 'orbit-ds-variables/dist/css/themes/d-green/index.css?url';
import nBlue from 'orbit-ds-variables/dist/css/themes/n-blue/index.css?url';
import nGreen from 'orbit-ds-variables/dist/css/themes/n-green/index.css?url';
import nGrey from 'orbit-ds-variables/dist/css/themes/n-grey/index.css?url';

export type OrbitThemeId = 'd-grey' | 'd-green' | 'n-grey' | 'n-green' | 'n-blue';

export const ORBIT_THEMES: { value: OrbitThemeId; title: string }[] = [
  { value: 'd-grey', title: 'Dark Grey (d-grey)' },
  { value: 'd-green', title: 'Dark Green (d-green)' },
  { value: 'n-grey', title: 'Neutral Grey (n-grey)' },
  { value: 'n-green', title: 'Neutral Green (n-green)' },
  { value: 'n-blue', title: 'Neutral Blue (n-blue)' },
];

export const ORBIT_THEME_STYLES: Record<OrbitThemeId, string> = {
  'd-grey': dGrey,
  'd-green': dGreen,
  'n-grey': nGrey,
  'n-green': nGreen,
  'n-blue': nBlue,
};

export const DEFAULT_ORBIT_THEME: OrbitThemeId = 'd-grey';

const THEME_LINK_ID = 'orbit-storybook-theme';

export function applyOrbitTheme(themeId: string): void {
  const href =
    ORBIT_THEME_STYLES[themeId as OrbitThemeId] ??
    ORBIT_THEME_STYLES[DEFAULT_ORBIT_THEME];

  let link = document.getElementById(THEME_LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = THEME_LINK_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  if (link.href !== href) {
    link.href = href;
  }
}
