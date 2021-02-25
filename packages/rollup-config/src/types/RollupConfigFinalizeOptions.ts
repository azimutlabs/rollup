import type { RollupOptions } from 'rollup';

import type { RollupConfigPlugins } from './RollupConfigPlugins';

export type RollupConfigFinalizeOptions<
  P extends Record<string, unknown>
> = Partial<RollupOptions> & {
  readonly pluginBuilders?: RollupConfigPlugins<P>;
};
