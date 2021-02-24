import { Envs } from './types/Envs';

const envs: Record<string, Envs> = {
  'development': Envs.Dev,
  'production': Envs.Prod,
  'test': Envs.Test,
  '': Envs.All,
};

export const getCurrentEnv = (env = process.env.NODE_ENV || ''): Envs => envs[env] || Envs.All;
