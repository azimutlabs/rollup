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
  return (
    configs
      // Default to `Envs.All` if no env provided.
      .map<ComposeFinalizeWithEnv>((cfg) => (isComposeFinalizeWithEnv(cfg) ? cfg : [cfg, Envs.All]))
      // Strip down configurations that doesn't match to the current or default env.
      .filter(([, env]) => {
        if (Array.isArray(env)) return env.includes(Envs.All) || env.includes(currentEnv);
        return env === Envs.All || env === currentEnv;
      })
      // Normalize to get the env that triggered the configuration that is about to be applied.
      .map(([finalize, env]) =>
        Array.isArray(env)
          ? [finalize, env.find((it) => it === Envs.All || it === currentEnv)]
          : [finalize, env]
      )
      // Apply.
      .map(([finalize, env]) => finalize(dirname, env))
  );
};
