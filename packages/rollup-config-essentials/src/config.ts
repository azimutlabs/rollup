import { RollupConfig } from '@azimutlabs/rollup-config';
import { rollupPluginExternal } from '@azimutlabs/rollup-plugin-external';
import { DEFAULTS, nodeResolve } from '@rollup/plugin-node-resolve';

import type { RollupConfigEssentialsPlugins } from './types/RollupConfigEssentialsPlugins';

export const rollupConfigEssentialsExtensions = DEFAULTS.extensions;

export const rollupConfigEssentials = new RollupConfig<RollupConfigEssentialsPlugins>(
  ({ rootDir }) => ({
    external: [rollupPluginExternal, { packagePath: rootDir }],
    nodeResolve: [
      nodeResolve,
      {
        extensions: rollupConfigEssentialsExtensions,
      },
    ],
  })
);

export const essentials = rollupConfigEssentials.finalize.bind(rollupConfigEssentials);
