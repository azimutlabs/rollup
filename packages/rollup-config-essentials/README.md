<h1 align="center">
  <a target="_blank" href="https://alabs.team">
    🍣
    <img
      height="22.5"
      src="https://raw.githubusercontent.com/azimutlabs/logos/master/little_logo.png"
      alt="azimutlabs logo"
    />
    /rollup-config-essentials
  </a>
</h1>

<p align="center">Essential features to properly work on a js library package</p>

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
  <a href="https://www.npmjs.com/package/@azimutlabs/rollup-config-essentials">
    <img
      src="https://img.shields.io/npm/v/@azimutlabs/rollup-config-essentials?color=blue&logo=npm&label="
      alt="@azimutlabs/rollup-plugin-external"
    />
  </a>
</p>

## Installation
Add peer dependencies:
```shell
$ yarn add -D rollup
```
...then install config packages:
```shell
$ yarn add -D @azimutlabs/rollup-{config,config-essentials}
```

## Usage
```javascript
// rollup.config.js
import essentials from '@azimutlabs/rollup-config-essentials';

export default essentials()(__dirname);
```

## Contributing
Any PR is welcomed by our **@js-opensource** team.
Check out our [contributing](../../CONTRIBUTING.md) guidelines for more info.

## License
[![azimutlabs rollup config license](https://img.shields.io/github/license/azimutlabs/rollup?label=as%20always&color=informational)](../../LICENSE)
