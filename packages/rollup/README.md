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

<p align="center">Collect Rollup configurations into a singular array</p>

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
   <a href="https://www.npmjs.com/package/@azimutlabs/rollup">
     <img
       src="https://img.shields.io/npm/v/@azimutlabs/rollup?color=blue&logo=npm&label="
       alt="@azimutlabs/rollup"
     />
   </a>
</p>

## Installation
 ```shell
 $ yarn add -D @azimutlabs/rollup
 ```

## Known issues
+ `collect` does not work with `esm`, so in order to use it, it is required to use `CommonJS` modules
  in rollup config. See [#41](https://github.com/azimutlabs/rollup/issues/41) for more info.

## Usage

### `collect`
**Collect configurations by the given array of glob patterns.**
```typescript
/**
 * @param patterns - packages glob patterns.
 * @param dirname - working directory root. defaults to process.cwd()
 */
function collect(patterns: readonly string[], dirname?: string): Promise<readonly RollupOptions[]>;
```

Given example:
```javascript
// packages/ui/rollup.config.js
import compose from '@azimutlabs/rollup-config';
import babel from '@azimutlabs/rollup-config-babel';

export default compose(__dirname, babel());
```
```javascript
// rollup.config.js
import { collect } from '@azimutlabs/rollup';

export default collect(['packages/*/rollup.config.js']);
```
...will result in:
```javascript
// rollup.config.js
// packages/ui/lib/
//   index.es.js - output from babel
export default [
  { /* packages/ui/rollup.config.js */ }
];
```

### `fromWorkspaces`
**Get packages glob patterns from the `workspaces` field in the nearest `package.json`**
```typescript
/**
 * @param pattern - rollup config files pattern. defaults to 'rollup.config.js'
 */
function fromWorkspaces(pattern?: string): readonly string[];
```

This is recommended usage when using yarn/npm
[workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) feature.
```json5
// package.json
{
  "workspaces": [
    "packages/*"
  ]
}
```
```javascript
// rollup.config.js
import { collect, fromWorkspaces } from '@azimutlabs/rollup';

export default collect(
  // Final collect scope will be: ['packages/*/rollup.config.js']
  fromWorkspaces(/* glob pattern for config files, e.g. rollup.config*.js */)
);
```

## Contributing
Any PR is welcomed by our **@js-opensource** team.
Check out our [contributing](../../CONTRIBUTING.md) guidelines for more info.

## License
[![azimutlabs rollup config license](https://img.shields.io/github/license/azimutlabs/rollup?label=as%20always&color=informational)](../../LICENSE)
