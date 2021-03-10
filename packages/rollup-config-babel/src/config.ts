import {
  rollupConfigEssentials,
  rollupConfigEssentialsExtensions,
} from '@azimutlabs/rollup-config-essentials';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import rollupPluginBabel from '@rollup/plugin-babel';

import type { RollupConfigBabelPlugins } from './types/RollupConfigBabelPlugins';

export const rollupConfigBabelExtensions = [
  ...rollupConfigEssentialsExtensions,
  ...DEFAULT_EXTENSIONS,
  '.ts',
  '.tsx',
];

export const rollupConfigBabel = rollupConfigEssentials.derive<RollupConfigBabelPlugins>(
  ({ rootDir }) => ({
    external: {
      checkForBabelMacro: true,
    },
    nodeResolve: {
      extensions: rollupConfigBabelExtensions,
    },
    babel: [
      rollupPluginBabel,
      {
        babelHelpers: 'runtime',
        skipPreflightCheck: true,
        extensions: rollupConfigBabelExtensions,
        root: rootDir,
      },
    ],
  })
);

export const babel = rollupConfigBabel.finalize.bind(rollupConfigBabel);
