import type { RollupOptions } from 'rollup';

export type RollupConfigFinalize = (dirnameOrOptions: RollupOptions | string) => RollupOptions;
