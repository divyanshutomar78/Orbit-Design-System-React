# @orbit/tokens

Design token CSS is provided by the [`orbit-ds-variables`](https://www.npmjs.com/package/orbit-ds-variables) package. This workspace package re-exports its CSS entry points.

Import a theme bundle and a platform bundle in your app:

```css
@import 'orbit-ds-variables/dist/css/themes/d-green/index.css';
@import 'orbit-ds-variables/dist/css/platforms/web/variables.css';
```

Or via this package:

```css
@import '@orbit/tokens/css/themes/d-green';
@import '@orbit/tokens/css/platforms/web';
```

Available themes: `d-green`, `d-grey`, `n-green`, `n-grey`, `n-blue`.
