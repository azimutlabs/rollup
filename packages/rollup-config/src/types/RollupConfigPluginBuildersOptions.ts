import type { Envs } from '../services/types/Envs';

export type RollupConfigPluginBuildersOptions = {
  readonly dirname: string;
  readonly env: Envs;
};
