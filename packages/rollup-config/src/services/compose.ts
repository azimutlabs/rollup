import type { RollupOptions } from 'rollup';

import { getCurrentEnv } from './getCurrentEnv';
import type { ComposeFinalize } from './types/ComposeFinalize';
import type { ComposeFinalizeWithEnv } from './types/ComposeFinalizeWithEnv';
import { Envs } from './types/Envs';

const isComposeFinalizeWithEnv = (value: unknown): value is ComposeFinalizeWithEnv =>
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  Array.isArray(value) && typeof value[0] === 'function';

export const compose = (
  dirname: string,
  configs: readonly ComposeFinalize[]
): readonly RollupOptions[] => {
  const currentEnv = getCurrentEnv();
  return configs
    .map<ComposeFinalizeWithEnv>((cfg) => (isComposeFinalizeWithEnv(cfg) ? cfg : [cfg, Envs.All]))
    .filter(([, env]) => (Array.isArray(env) ? env.includes(currentEnv) : env === currentEnv))
    .map(([finalize]) => finalize(dirname));
};
