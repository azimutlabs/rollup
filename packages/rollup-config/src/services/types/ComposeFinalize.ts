import type { RollupConfigFinalize } from '../../types/RollupConfigFinalize';
import type { ComposeFinalizeWithEnv } from './ComposeFinalizeWithEnv';

export type ComposeFinalize = ComposeFinalizeWithEnv | RollupConfigFinalize;
