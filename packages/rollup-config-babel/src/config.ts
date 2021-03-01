import {
  rollupConfigEssentials,
  rollupConfigEssentialsExtensions,
} from '@azimutlabs/rollup-config-essentials';
import rollupPluginBabel from '@rollup/plugin-babel';

import type { RollupConfigBabelPlugins } from './types/RollupConfigBabelPlugins';

export const rollupConfigBabelExtensions = [
  ...rollupConfigEssentialsExtensions,
  '.es6',
  '.es',
  '.jsx',
  '.ts',
  '.tsx',
];

export const rollupConfigBabel = rollupConfigEssentials.derive<RollupConfigBabelPlugins>(() => ({
  external: {
    checkForBabelMacro: true,
  },
  nodeResolve: {
    extensions: rollupConfigBabelExtensions,
  },
  babel: [
    rollupPluginBabel,
    {
      extensions: rollupConfigBabelExtensions,
      skipPreflightCheck: true,
      babelHelpers: 'runtime',
    },
  ],
}));

export const babel = rollupConfigBabel.finalize.bind(rollupConfigBabel);
