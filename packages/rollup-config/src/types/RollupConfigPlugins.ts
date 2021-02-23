import type { RollupConfigPluginBuilderWithOptions } from './RollupConfigPluginBuilderWithOptions';

export type RollupConfigPlugins<P extends Record<string, unknown>> = {
  readonly [K in keyof P]: RollupConfigPluginBuilderWithOptions<P[K]>;
};
