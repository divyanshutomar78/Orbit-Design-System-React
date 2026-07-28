export type OrbitThemeId = 'd-grey' | 'd-green' | 'n-grey' | 'n-green' | 'n-blue';

export const ORBIT_THEMES: { value: OrbitThemeId; title: string }[] = [
  { value: 'd-grey', title: 'Dark Grey (d-grey)' },
  { value: 'd-green', title: 'Dark Green (d-green)' },
  { value: 'n-grey', title: 'Neutral Grey (n-grey)' },
  { value: 'n-green', title: 'Neutral Green (n-green)' },
  { value: 'n-blue', title: 'Neutral Blue (n-blue)' },
];

const ORBIT_PRIMITIVES_STYLE = '/orbit-primitives/variables.css';

// Served via Storybook staticDirs from orbit-ds-variables package.
export const ORBIT_THEME_STYLES: Record<OrbitThemeId, string> = {
  'd-grey': '/orbit-themes/d-grey/variables.css',
  'd-green': '/orbit-themes/d-green/variables.css',
  'n-grey': '/orbit-themes/n-grey/variables.css',
  'n-green': '/orbit-themes/n-green/variables.css',
  'n-blue': '/orbit-themes/n-blue/variables.css',
};

export const DEFAULT_ORBIT_THEME: OrbitThemeId = 'd-grey';

const PRIMITIVES_LINK_ID = 'orbit-storybook-primitives';
const THEME_LINK_ID = 'orbit-storybook-theme';

function upsertStylesheet(id: string, href: string): void {
  let link = document.getElementById(id) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  if (link.href !== href) {
    link.href = href;
  }
}

export function applyOrbitTheme(themeId: string): void {
  const href =
    ORBIT_THEME_STYLES[themeId as OrbitThemeId] ?? ORBIT_THEME_STYLES[DEFAULT_ORBIT_THEME];
  upsertStylesheet(PRIMITIVES_LINK_ID, ORBIT_PRIMITIVES_STYLE);
  upsertStylesheet(THEME_LINK_ID, href);
}
