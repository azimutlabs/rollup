import type { RollupConfigPluginBuilder } from './RollupConfigPluginBuilder';

export type RollupConfigPluginBuilderWithOptions<O> = readonly [
  pluginBuilder: RollupConfigPluginBuilder<O>,
  options: O
];
