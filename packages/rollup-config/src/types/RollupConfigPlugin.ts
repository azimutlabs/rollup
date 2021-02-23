import type { RollupConfigPluginBuilder } from './RollupConfigPluginBuilder';
import type { RollupConfigPluginBuilderWithOptions } from './RollupConfigPluginBuilderWithOptions';

export type RollupConfigPlugin<O> =
  | O
  | RollupConfigPluginBuilder<O>
  | RollupConfigPluginBuilderWithOptions<O>;
