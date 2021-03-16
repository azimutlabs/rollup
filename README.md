<h1 align="center">
  <a target="_blank" href="https://alabs.team">
    🍣
    <img
      height="22.5"
      src="https://raw.githubusercontent.com/azimutlabs/logos/master/little_logo.png"
      alt="azimutlabs logo"
    />
    /rollup
  </a>
</h1>

<p align="center">Rollup configurations for the best package bundling experience</p>

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
</p>

## Overview
This repo provides everything you need to use [Rollup](https://github.com/rollup/rollup) as your
main **library** bundler: plugins, configurations, and utilities to work with them.

Simply import and call:
```javascript
// rollup.config.js
import babel from '@azimutlabs/rollup-config-babel';
// You can pass '__dirname' if 'rollup.config.js' file is placed at the root of the library dir.
export default babel()('path/to/library');
```
...and output is a single `RollupOptions` objects:
```javascript
export default {
  /* ...other RollupOptions */
  input: '/root/project/src/index.js',
  output: { format: 'es', dir: '/root/project/lib' },
  plugins: [
    // @azimutlabs/rollup-plugin-external
    { name: '@azimutlabs/rollup-plugin-external' },
    // @rollup/plugin-node-resolve
    { name: 'node-resolve' },
    // @rollup/plugin-babel
    { name: 'babel' },
  ],
}
```

## Installation
All of our packages have `rollup` as a peer dependency, so you have to install it first:
```shell
$ yarn add -D rollup
```
...then add whatever package you want. The naming always starts with `@azimutlabs/rollup`.
For example, here is the installation script for the `babel` configuration pack.
```shell
$ yarn add -D @azimutlabs/rollup-{config,config-babel}
```

## Packages
The list of our rollup packages.
Click the badges to see more information about the curtain package.

| | |
| --- | --- |
| [![@azimutlabs/rollup][rollup]](packages/rollup) | Collect Rollup configurations into a singular array |
| [![@azimutlabs/rollup-config][rollup-config]](packages/rollup-config) | Compose, combine, merge and create Rollup configurations |
| | |

[rollup]: https://img.shields.io/npm/v/@azimutlabs/rollup?color=cyan&label=rollup
[rollup-config]: https://img.shields.io/npm/v/@azimutlabs/rollup-config?color=cyan&label=rollup-config

### Plugins `@azimutlabs/rollup-plugin-*`
| | |
| --- | --- |
| [![@azimutlabs/rollup-plugin-external][plugin-external]](packages/rollup-plugin-external) | Control [`external`](https://rollupjs.org/guide/en/#external) field of Rollup configuration depending on `package.json` |
| | |

### Configurations `@azimutlabs/rollup-config-*`
| | |
| --- | --- |
| [![@azimutlabs/rollup-config-essentials][config-essentials]](packages/rollup-config-essentials) | Essential features to properly work on a js library package |
| [![@azimutlabs/rollup-config-babel][config-babel]](packages/rollup-config-babel) | Compile code using [Babel](https://github.com/babel/babel#readme) |
| [![@azimutlabs/rollup-config-typescript][config-typescript]](packages/rollup-config-typescript) | Compile code using [TypeScript](https://github.com/microsoft/TypeScript/#readme) |
| | |

[plugin-external]: https://img.shields.io/npm/v/@azimutlabs/rollup-plugin-external?color=green&label=external
[config-essentials]: https://img.shields.io/npm/v/@azimutlabs/rollup-config-essentials?color=blue&label=essentials
[config-babel]: https://img.shields.io/npm/v/@azimutlabs/rollup-config-babel?color=blue&label=babel
[config-typescript]: https://img.shields.io/npm/v/@azimutlabs/rollup-config-typescript?color=blue&label=typescript

## Usage
**We highly suggest that you read specific readmes of packages that you want to use.**
Here we have some general usage descriptions.

Consider that we are writing a **TypeScript** + **React** ui library. We want to have `commonjs` support
to work properly inside of a `node` environment and `es6` import/export to support tree-shaking.
All those requirements are accomplished by this rollup config:
```typescript
// rollup.config.js
import compose, { combine } from '@azimutlabs/rollup-config';
import babel from '@azimutlabs/rollup-config-babel';
import typescript from '@azimutlabs/rollup-config-babel';

// Compose multiple configurations into a singular array of 'RollupOptions'.
export default compose(
  // Take the 'rollup.config.js' files location as the package root.
  __dirname,
  // Change the default 'es' format to 'cjs'.
  babel('cjs'),
  // Will only be present in the final config when the 'NODE_ENV' var is set to 'production'.
  [combine(babel(), typescript(), Envs.Prod)]
);
```
Output will be:
```javascript
// NODE_ENV === 'production'
// lib/
//   ...
//   index.d.ts - output from typescript
//   index.es.js - output from babel + typescript
//   index.cjs.js - output from babel
export default [
  { /* babel commonjs config */ },
  { /* babel + typescript config */ }
]
```

## Contributing
Any PR is welcomed by our **@js-opensource** team.
Check out our [contributing](CONTRIBUTING.md) guidelines for more info.

## License
[![azimutlabs rollup config license](https://img.shields.io/github/license/azimutlabs/rollup?label=as%20always&color=informational)](LICENSE)
