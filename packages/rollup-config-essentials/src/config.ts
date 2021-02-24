import { RollupConfig } from '@azimutlabs/rollup-config';
import { rollupPluginExternal } from '@azimutlabs/rollup-plugin-external';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import type { RollupConfigEssentialsPlugins } from './types/RollupConfigEssentialsPlugins';

export const rollupConfigEssentials = new RollupConfig<RollupConfigEssentialsPlugins>(
  ({ dirname }) => ({
    external: [rollupPluginExternal, { packagePath: dirname }],
    nodeResolve: [nodeResolve, {}],
  })
);

export const essentials = rollupConfigEssentials.finalize.bind(rollupConfigEssentials);
