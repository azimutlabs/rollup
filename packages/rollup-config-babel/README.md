<h1 align="center">
  <a target="_blank" href="https://alabs.team">
    🍣
    <img
      height="22.5"
      src="https://raw.githubusercontent.com/azimutlabs/logos/master/little_logo.png"
      alt="azimutlabs logo"
    />
    /rollup-config-babel
  </a>
</h1>

<p align="center">Compile code using <a href='https://github.com/babel/babel#readme'>Babel</a></p>

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
  <a href="https://www.npmjs.com/package/@azimutlabs/rollup-config-babel">
    <img
      src="https://img.shields.io/npm/v/@azimutlabs/rollup-config-babel?color=blue&logo=npm&label="
      alt="@azimutlabs/rollup-config-babel"
    />
  </a>
</p>

## Installation
Add peer dependencies:
```shell
$ yarn add -D rollup @babel/core
```
...then install config packages:
```shell
$ yarn add -D @azimutlabs/rollup-{config,config-babel}
```

## Usage
```javascript
// rollup.config.js
import babel from '@azimutlabs/rollup-config-babel';

export default babel(
  // Output format. Defaults to 'es'
  'cjs',
  {
    // Optional RollupOptions that will be merged with configuration options.
    shimMissingExports: true,
    // Optional RollupConfigPlugins<P> object that will be merged with
    // configuration plugins.
    pluginBuilders: {
      // Merge with default '@rollup/plugin-babel' plugin options.
      babel: {
        babelHelpers: ['bundled'],
      },
    },
  }
)('path/to/package');
```

## Contributing
Any PR is welcomed by our **@js-opensource** team.
Check out our [contributing](../../CONTRIBUTING.md) guidelines for more info.

## License
[![azimutlabs rollup config license](https://img.shields.io/github/license/azimutlabs/rollup?label=as%20always&color=informational)](../../LICENSE)
