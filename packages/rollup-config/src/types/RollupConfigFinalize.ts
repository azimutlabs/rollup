import type { RollupOptions } from 'rollup';

import type { Envs } from '../services/types/Envs';

export type RollupConfigFinalize = (dirname: string, env?: Envs) => RollupOptions;
