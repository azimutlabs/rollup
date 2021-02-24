import type { RollupConfigFinalize } from '../../types/RollupConfigFinalize';
import type { Envs } from './Envs';

export type ComposeFinalizeWithEnv = readonly [
  finalize: RollupConfigFinalize,
  envs: Envs | readonly Envs[]
];
