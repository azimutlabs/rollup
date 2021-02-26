<h1 align="center">
  <a target="_blank" href="https://alabs.team">
    🍣
    <img
      height="22.5"
      src="https://raw.githubusercontent.com/azimutlabs/logos/master/little_logo.png"
      alt="azimutlabs logo"
    />
    /rollup-config-typescript
  </a>
</h1>

<p align="center">Compile code using <a href='https://github.com/microsoft/TypeScript/#readme'>TypeScript</a></p>

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
  <a href="https://www.npmjs.com/package/@azimutlabs/rollup-config-typescript">
    <img
      src="https://img.shields.io/npm/v/@azimutlabs/rollup-config-typescript?color=blue&logo=npm&label="
      alt="@azimutlabs/rollup-plugin-external"
    />
  </a>
</p>

## Installation
Add peer dependencies:
```shell
$ yarn add -D rollup typescript
```
...then install config packages:
```shell
$ yarn add -D @azimutlabs/rollup-{config,config-typescript}
```

## Usage
```javascript
// rollup.config.js
import typescript from '@azimutlabs/rollup-config-typescript';

export default typescript()(__dirname);
```

## Contributing
Any PR is welcomed by our **@js-opensource** team.
Check out our [contributing](../../CONTRIBUTING.md) guidelines for more info.

## License
[![azimutlabs rollup config license](https://img.shields.io/github/license/azimutlabs/rollup?label=as%20always&color=informational)](../../LICENSE)
