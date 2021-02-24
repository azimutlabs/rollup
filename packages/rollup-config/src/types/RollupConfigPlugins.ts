import type { RollupConfigPlugin } from './RollupConfigPlugin';

export type RollupConfigPlugins<P extends Record<string, unknown>> = {
  readonly [K in keyof P]?: RollupConfigPlugin<Partial<P[K]>>;
};
