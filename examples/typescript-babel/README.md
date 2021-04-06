<h1 align="center">
  <a target="_blank" href="https://alabs.team">
    🍣
    <img
      height="22.5"
      src="https://raw.githubusercontent.com/azimutlabs/logos/master/little_logo.png"
      alt="azimutlabs logo"
    />
    /rollup-example-typescript-babel
  </a>
</h1>

<p align="center">React Typescript CSS-in-JS (using Emotion and TailwindCSS) library package example</p>

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

## [Configuration](rollup.config.js)
```js
import { compose } from '@azimutlabs/rollup-config';
import { babel } from '@azimutlabs/rollup-config-babel';
import { typescriptBabel } from '@azimutlabs/rollup-config-typescript';

export default compose(__dirname, babel('cjs'), typescriptBabel('es'));
```

## Output
```shell
lib/
  # index.ts - module entry
  index.cjs.js
  index.es.js
  index.d.ts

  # component.tsx - React JSX and Emotion/Tailwind macros
  component.cjs.js
  component.es.js
  component.d.ts

  # props.ts - contains only types
  props.d.ts
```

## Scripts
Compile the source directory:
```shell
$ yarn compile
```

## Contributing
Any PR is welcomed by our **@js-opensource** team.
Check out our [contributing](../../CONTRIBUTING.md) guidelines for more info.

## License
[![azimutlabs rollup config license](https://img.shields.io/github/license/azimutlabs/rollup?label=as%20always&color=informational)](../../LICENSE)
