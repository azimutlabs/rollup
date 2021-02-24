import { rollupConfigEssentials } from '@azimutlabs/rollup-config-essentials';
import rollupPluginTypescript from '@rollup/plugin-typescript';
import { findSync } from 'tsconfig';
import type { RollupConfigTypescriptPlugins } from 'types/RollupConfigTypescriptPlugins';

export const rollupConfigTypescript = rollupConfigEssentials.derive<RollupConfigTypescriptPlugins>(
  ({ dirname }) => ({
    nodeResolve: {
      extensions: ['.ts', '.tsx'],
    },
    typescript: [
      rollupPluginTypescript,
      { tsconfig: findSync(dirname) || false, tslib: require.resolve('tslib') },
    ],
  })
);

export const typescript = rollupConfigTypescript.finalize.bind(rollupConfigTypescript);
