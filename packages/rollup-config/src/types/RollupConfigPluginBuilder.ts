import type { Plugin } from 'rollup';

export type RollupConfigPluginBuilder<O> = (options: O) => Plugin;
