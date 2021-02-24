import type { RollupConfigPluginBuilders } from './RollupConfigPluginBuilders';
import type { RollupConfigPluginBuildersOptions } from './RollupConfigPluginBuildersOptions';

export type RollupConfigPluginBuildersGetter<C extends Record<string, unknown>> = (
  options: RollupConfigPluginBuildersOptions
) => RollupConfigPluginBuilders<C>;
