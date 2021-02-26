<h1 align="center">
  <a target="_blank" href="https://alabs.team">
    🍣
    <img
      height="22.5"
      src="https://raw.githubusercontent.com/azimutlabs/logos/master/little_logo.png"
      alt="azimutlabs logo"
    />
    /rollup-plugin-external
  </a>
</h1>

<p align="center">Rollup plugin to exclude external dependencies from bundle</p>

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
  <a href="https://www.npmjs.com/package/@azimutlabs/rollup-plugin-external">
    <img
      src="https://img.shields.io/npm/v/@azimutlabs/rollup-plugin-external?color=blue&logo=npm&label="
      alt="@azimutlabs/rollup-plugin-external"
    />
  </a>
</p>

## Installation
```shell
$ yarn add --save-dev @azimutlabs/rollup-plugin-external
```

## Usage
```javascript
// rollup.config.js
import external from '@azimutlabs/rollup-plugin-external';

export default {
  input: 'index.js',
  plugins: [
    external({
      // Default options.
      useDependencies: true,
      usePeerDependencies: true,
      useBuiltins: true,
      checkForBabelMacro: false,
      packagePath: process.cwd(),
    }),
  ],
};
```

Plugin does not override rollup's [external](https://rollupjs.org/guide/en/#external) option.
Instead, it firstly looks for external, then applies plugin's core functionality
```javascript
// rollup.package.js
import external from '@azimutlabs/rollup-plugin-external';

export default {
  input: 'index.js',
  plugins: [external()],
  external: id => id.includes('fp-ts'),
};
```

## Options
| Name | Description | Type | Default |
|------|-------------|------|---------|
|`useDependencies`|Indicates whether to include `dependencies` from `package.json`|`boolean`|`true`|
|`usePeerDependencies`|Indicates whether to include `peer dependencies` from `package.json`|`boolean`|`true`|
|`useBuiltins`|Indicates whether to include **Node.js** builtin modules|`boolean`|`true`|
|`checkForBabelMacro`|Indicates whether to check `package.json` for [**Babel Macro**](https://github.com/kentcdodds/babel-plugin-macros) packages|`boolean`|`false`|
|`packagePath`|Directory or path to `package.json`. If not provided, looks for closest `package.json` starting from current directory|`string`|`process.cwd()`|

## Acknowledgement
This plugin was inspired by [`rollup-plugin-auto-external`](https://github.com/stevenbenisek/rollup-plugin-auto-external)

## Contributing
Any PR is welcomed by our **@js-opensource** team.
Check out our [contributing](../../CONTRIBUTING.md) guidelines for more info.

## License
[![azimutlabs rollup config license](https://img.shields.io/github/license/azimutlabs/rollup?label=as%20always&color=informational)](../../LICENSE)
