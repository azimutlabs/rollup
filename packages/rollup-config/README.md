<h1 align="center">
  <a target="_blank" href="https://alabs.team">
    🍣
    <img
      height="22.5"
      src="https://raw.githubusercontent.com/azimutlabs/logos/master/little_logo.png"
      alt="azimutlabs logo"
    />
    /rollup-config
  </a>
</h1>

<p align="center">Compose, combine, merge and create Rollup configurations</p>

<p align="center">
  <a href="https://github.com/azimutlabs/rollup/actions?query=workflow%3A%22Lint+and+Test%22">
    <img
      src="https://github.com/azimutlabs/rollup/workflows/Lint%20and%20Test/badge.svg"
      alt="azimutlabs/rollup repository github workflow status"
    />
  </a>
  <a href="https://github.com/azimutlabs/rollup/blob/master/LICENSE">
    <img
      src="https://img.shields.io/github/license/azimutlabs/rollup?label=License"
      alt="azimutlabs/rollup repository license"
    />
  </a>
   <a href="https://www.npmjs.com/package/@azimutlabs/rollup-config">
     <img
       src="https://img.shields.io/npm/v/@azimutlabs/rollup-config?color=blue&logo=npm&label="
       alt="@azimutlabs/rollup-config"
     />
   </a>
</p>

## Installation
 ```shell
 $ yarn add -D @azimutlabs/rollup-config
 ```

## Usage

### `combine`
**Combine several configurations into a single `RollupOptions` object.**
```typescript
function combine(...configs: readonly RollupConfigFinalize[]): RollupConfigFinalize;
```

Given example:
```javascript
// rollup.config.js
import { combine } from '@azimutlabs/rollup-config';
import babel from '@azimutlabs/rollup-config-babel';
import typescript from '@azimutlabs/rollup-config-typescript';
// Order is important, because 'combine' will prefer to add the latest plugins in case of
// plugin merge conflicts.
export default combine(babel(), typescript())('path/to/package');
```
...will result in:
```javascript
// rollup.config.js
export default {
  /* ...merged RollupOptions */
  plugins: [
    // Babel from 'rollup-config-babel'.
    { name: 'babel' },
    // External and Node-Resolve here because of how 'combine' handles duplicate plugins.
    // It will prefer the latest plugins and keep them, stripping down the others.
    { name: 'external' },
    { name: 'node-resolve' },
    // TypeScript from 'rollup-config-typescript'.
    { name: 'typescript' },
  ],
}
```

### `compose`
**Compose multiple configurations into a singular array of `RollupOptions`.**
```typescript
function compose(dirname: string, ...configs: readonly ComposeFinalize[]): readonly RollupOptions[];
```

Just by using `RollupConfigFinalize`:
```javascript
// rollup.config.js
import compose from '@azimutlabs/rollup-config';
import babel from '@azimutlabs/rollup-config-babel';
import typescript from '@azimutlabs/rollup-config-typescript';
// If your `rollup.config.js` file is already located at the root of your package
// you can just pass down '__dirname' as the first argument.
export default compose('path/to/package', typescript('es'), babel('cjs'));
```
...will result in:
```javascript
// lib/
//   index.d.ts - output from typescript
//   index.es.js - output from typescript
//   index.cjs.js - output from babel
export default [
  { /* typescript config */ },
  { /* babel config */ },
];
```
But if we use `ComposeFinalizeWithEnv`:
```javascript
// rollup.config.js
import compose, { Envs } from '@azimutlabs/rollup-config';
import babel from '@azimutlabs/rollup-config-babel';
import typescript from '@azimutlabs/rollup-config-typescript';

export default compose(
  'path/to/package',
  babel('cjs'),
  /**
   * You can even pass down multiple envs:
   * @example
   * [typescript('es'), [Envs.Test, Envs.Prod]]
   */
  [typescript('es'), Envs.Prod]
);
```
...final result will differ depending on `NODE_ENV` environment variable. By default, if no value
provided, we will consider it as `development`:
```javascript
// NODE_ENV === ''
// lib/
//   index.cjs.js - output from babel
export default [
  { /* babel config */ },
];
// NODE_ENV === 'production'
// lib/
//   index.d.ts - output from typescript
//   index.es.js - output from typescript
//   index.cjs.js - output from babel
export default [
  { /* babel config */ },
  { /* typescript config */ },
];
```

### `RollupConfig`
Class used as the base of our configurations. Consider checking
[contributing](../../CONTRIBUTING.md) to learn more about it.

## Contributing
Any PR is welcomed by our **@js-opensource** team.
Check out our [contributing](../../CONTRIBUTING.md) guidelines for more info.

## License
[![azimutlabs rollup config license](https://img.shields.io/github/license/azimutlabs/rollup?label=as%20always&color=informational)](../../LICENSE)
