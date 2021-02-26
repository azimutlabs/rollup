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
This repo provides [Rollup](https://github.com/rollup/rollup) configurations to bundle packages
including basic configuration as well as configs for `Babel` and `Typescript`. It also provides useful
functions to make operations on configs, such as `merge`, `combine`, `compose`, `collect` and more.
In addition, package has plugins for rollup configuration.

## Installation
All of our packages have `rollup` as a peer dependency, so you have to install it first:
```shell
$ yarn add --save-dev rollup
```
...then add whatever package you want. The naming always starts with `@azimutlabs/rollup`.
For example, here is installation script for `babel` configuration pack.
```shell
$ yarn add --save-dev @azimutlabs/rollup-{config,config-babel}
```

## Usage

### Configurations
Package contains several configurations. All of them are used similarly:

```javascript
import { typescript } from '@azimutlabs/rollup-config-essentials';

export default essentials(
  // Format of the output file.
  'cjs',
  {/* Rollup options */}
);
```

### `combine`
Use `combine` in order to combine several finalized configs into one config:
```javascript
// packages/rollup.config.js
export default rollupConfig
  .finalize
  .bind(rollupConfig);

// packages/anotherRollup.config.js
export default anotherRollupConfig
  .finalize
  .bind(anotherRollupConfig);

// rollup.config.js
import { combine } from '@azimutlabs/rollup-config';

export default combine(rollupConfig, anotherRollupConfig);
```

### `compose`
Use `compose` to compose finalized Rollup configs
```javascript
import { compose, Envs } from '@azimutlabs/rollup-config';
import { typescript } from '@azimutlabs/rollup-config-typescript';
import { babel } from '@azimutlabs/rollup-config-babel';

// Without specifying environment.
export default compose(
  __dirname,
  typescript(),
  babel()
);

// with environment
export default compose(
  __dirname,
  // You can provide environment to include config only in necessary build.
  [typescript(), Envs.Prod],
  babel()
);
```

Example of using combine with compose
```javascript
import { compose, combine, Envs } from '@azimutlabs/rollup-config';
import { typescript } from '@azimutlabs/rollup-config-typescript';
import { babel } from '@azimutlabs/rollup-config-babel';
import { someConfig } from './libs/someConfig'
import { anotherConfig } from './libs/anotherConfig'

export default compose(
  __dirname,
  [combine(someConfig, anotherConfig), Envs.Dev],
  [typescript(), Envs.Prod],
  babel(),
);
```

## Usage with Mono-repo
If your project is built using monorepo, we suggest you to use `collect` from `@azimutlabs/rollup`
package, which collects config files from other packages and merges it to one:
```javascript
// ./packages/ui/rollup.config.js
import { compose } from '@azimutlabs/rollup-config';
import { babel } from '@azimutlabs/rollup-config-babel';

export default compose(__dirname, babel());

// From the root of the mono-repo.
// ./rollup.config.js
import { collect } from '@azimutlabs/rollup';

export default collect(['packages/*/rollup.config.js']);
```
You can also use `useWorkspaces` to get workspaces option from the nearest `package.json`:
```json5
// package.json
{
  // ...
  "workspaces": [
    "packages/*"
  ]
}
```
```javascript
// rollup.config.js
import { collect, useWorkspaces } from '@azimutlabs/rollup';

export default collect(
  // Final collect scope will be: ['packages/*/rollup.config.js']
  useWorkspaces(/* glob pattern for config files, e.g. rollup.config*.js */)
);
```

## Contributing
Any PR is welcomed by our **@js-opensource** team.
Check out our [contributing](CONTRIBUTING.md) guidelines for more info.

## License
[![azimutlabs rollup config license](https://img.shields.io/github/license/azimutlabs/rollup?label=as%20always&color=informational)](LICENSE)
