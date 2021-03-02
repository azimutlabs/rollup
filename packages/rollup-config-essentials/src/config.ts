import { RollupConfig } from '@azimutlabs/rollup-config';
import { rollupPluginExternal } from '@azimutlabs/rollup-plugin-external';
import alias from '@rollup/plugin-alias';
import { DEFAULTS, nodeResolve } from '@rollup/plugin-node-resolve';
import { lstatSync, readdirSync } from 'fs';
import { resolve } from 'path';

import type { RollupConfigEssentialsPlugins } from './types/RollupConfigEssentialsPlugins';

export const rollupConfigEssentialsExtensions = DEFAULTS.extensions;

export const rollupConfigEssentials = new RollupConfig<RollupConfigEssentialsPlugins>(
  ({ rootDir, sourceDir }) => {
    const entries = readdirSync(sourceDir)
      .filter((dir) => lstatSync(resolve(sourceDir, dir)).isDirectory())
      .map((find) => ({ find, replacement: resolve(sourceDir, find) }));
    return {
      alias: [alias, { entries }],
      external: [rollupPluginExternal, { packagePath: rootDir }],
      nodeResolve: [nodeResolve, { extensions: rollupConfigEssentialsExtensions }],
    };
  }
);

export const essentials = rollupConfigEssentials.finalize.bind(rollupConfigEssentials);
