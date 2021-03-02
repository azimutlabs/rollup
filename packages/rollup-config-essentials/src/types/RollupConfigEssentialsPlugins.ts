import type { RollupPluginExternalOptions } from '@azimutlabs/rollup-plugin-external';
import type { RollupAliasOptions } from '@rollup/plugin-alias';
import type { RollupNodeResolveOptions } from '@rollup/plugin-node-resolve';

export type RollupConfigEssentialsPlugins = {
  readonly alias: RollupAliasOptions;
  readonly external: RollupPluginExternalOptions;
  readonly nodeResolve: RollupNodeResolveOptions;
};
