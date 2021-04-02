<h1 align="center">
  <a target="_blank" href="https://alabs.team">
    🍣
    <img
      height="22.5"
      src="https://raw.githubusercontent.com/azimutlabs/logos/master/little_logo.png"
      alt="azimutlabs logo"
    />
    /rollup-example-mono-repo
  </a>
</h1>

<p align="center">UI library mono-repo example</p>

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

## Configurations
The [**Root**](rollup.config.js) configuration:
```js
import { collect, fromWorkspaces } from '@azimutlabs/rollup';

export default collect(fromWorkspaces());
```

[**components**](components/rollup.config.js) package configuration:
```js
const { typescriptBabel } = require('@azimutlabs/rollup-config-typescript');

module.exports = typescriptBabel()(__dirname);
```

[**colors**](components/rollup.config.js) package configuration:
```js
const { typescript } = require('@azimutlabs/rollup-config-typescript');

module.exports = typescript()(__dirname);
```

## Output
```shell
colors/
  lib/
    # index.ts
    index.es.d.ts
    index.es.js

    # colors.ts
    colors.es.d.ts
    colors.es.js

components/
  lib/
    # index.ts - module entry
    index.es.d.ts
    index.es.js

    # Input/props.ts - contains only types
    props-${hash}.d.ts

    Input/
      # Input/component.ts - React JSX and Emotion/Tailwind macros
      component.es.d.ts
      component.es.js
```

## Scripts
Compile the workspace:
```shell
$ yarn compile
```
Compile the workspace in **watch mode**. Better suited for development:
```shell
$ yarn start
```

## Contributing
Any PR is welcomed by our **@js-opensource** team.
Check out our [contributing](../../CONTRIBUTING.md) guidelines for more info.

## License
[![azimutlabs rollup config license](https://img.shields.io/github/license/azimutlabs/rollup?label=as%20always&color=informational)](../../LICENSE)
