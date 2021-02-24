import type { RollupConfigPluginBuilderWithOptions } from './RollupConfigPluginBuilderWithOptions';

export type RollupConfigPluginBuilders<P extends Record<string, unknown>> = {
  readonly [K in keyof P]: RollupConfigPluginBuilderWithOptions<P[K]>;
};
