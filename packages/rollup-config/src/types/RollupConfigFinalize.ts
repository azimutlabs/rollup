import type { RollupOptions } from 'rollup';

export type RollupConfigFinalize = (dirname: string) => RollupOptions;
