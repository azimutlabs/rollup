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
import { combine } from '@azimutlabs/rollup-config';
import { babel } from '@azimutlabs/rollup-config-babel';
import { typescript } from '@azimutlabs/rollup-config-typescript';

export default combine([babel, typescript]);
```

[**colors**](components/rollup.config.js) package configuration:
```js
import { typescript } from '@azimutlabs/rollup-config-typescript';

export default typescript();
```

## Output
```shell
colors/
  lib/
    # index.ts
    index.es.js
    index.d.ts

    # colors.ts
    colors.es.js
    colors.d.ts

components/
  lib/
    # index.ts - module entry
    index.es.js
    index.d.ts

    Input/
      # Input/component.ts - React JSX and Emotion/Tailwind macros
      component.es.d.ts
      component.es.js

      # Input/props.ts - contains only types
      props.d.ts
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
