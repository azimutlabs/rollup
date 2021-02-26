import { Envs } from './types/Envs';

const envs: Record<string, Envs> = {
  development: Envs.Dev,
  production: Envs.Prod,
  test: Envs.Test,
};

export const getCurrentEnv = (env = process.env.NODE_ENV): Envs => {
  if (env) return envs[env] || Envs.Dev;
  return Envs.Dev;
};
