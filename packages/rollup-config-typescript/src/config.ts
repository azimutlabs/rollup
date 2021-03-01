import {
  rollupConfigEssentials,
  rollupConfigEssentialsExtensions,
} from '@azimutlabs/rollup-config-essentials';
import rollupPluginTypescript from '@rollup/plugin-typescript';
import { findSync } from 'tsconfig';
import type { RollupConfigTypescriptPlugins } from 'types/RollupConfigTypescriptPlugins';

export const rollupConfigTypescriptExtensions = [
  ...rollupConfigEssentialsExtensions,
  '.ts',
  '.tsx',
];

export const rollupConfigTypescript = rollupConfigEssentials.derive<RollupConfigTypescriptPlugins>(
  ({ dirname }) => ({
    nodeResolve: {
      extensions: rollupConfigTypescriptExtensions,
    },
    typescript: [
      rollupPluginTypescript,
      { tsconfig: findSync(dirname) || false, tslib: require.resolve('tslib') },
    ],
  })
);

export const typescript = rollupConfigTypescript.finalize.bind(rollupConfigTypescript);
