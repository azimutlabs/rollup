import type { RollupPluginExternalOptions } from '@azimutlabs/rollup-plugin-external';
import type { RollupNodeResolveOptions } from '@rollup/plugin-node-resolve';

export type RollupConfigEssentialsPlugins = {
  readonly external: RollupPluginExternalOptions;
  readonly nodeResolve: RollupNodeResolveOptions;
};
