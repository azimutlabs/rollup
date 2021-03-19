import {
  rollupConfigEssentials,
  rollupConfigEssentialsExtensions,
} from '@azimutlabs/rollup-config-essentials';
import typescriptRollupPlugin from '@wessberg/rollup-plugin-ts';

import type { RollupConfigTypescriptPlugins } from './types/RollupConfigTypescriptPlugins';

export const rollupConfigTypescriptExtensions = [
  ...rollupConfigEssentialsExtensions,
  '.ts',
  '.tsx',
];

export const rollupConfigTypescript = rollupConfigEssentials.derive<RollupConfigTypescriptPlugins>(
  ({ rootDir }) => ({
    nodeResolve: {
      extensions: rollupConfigTypescriptExtensions,
    },
    typescript: [
      typescriptRollupPlugin,
      {
        transpiler: 'typescript',
        cwd: rootDir,
      },
    ],
  })
);

// We don't any new plugins for typescriptBabel.
// eslint-disable-next-line @typescript-eslint/ban-types
export const rollupConfigTypescriptBabel = rollupConfigTypescript.derive<{}>(() => ({
  typescript: {
    transpiler: 'babel',
  },
}));

export const typescript = rollupConfigTypescript.finalize.bind(rollupConfigTypescript);
export const typescriptBabel = rollupConfigTypescriptBabel.finalize.bind(
  rollupConfigTypescriptBabel
);
