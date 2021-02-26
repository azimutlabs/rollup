import type { RollupConfigFinalize } from '../types/RollupConfigFinalize';
import { getCurrentEnv } from './getCurrentEnv';
import { merge } from './merge';

export const combine = (
  // eslint-disable-next-line functional/functional-parameters
  ...configs: readonly [RollupConfigFinalize, ...(readonly RollupConfigFinalize[])]
): RollupConfigFinalize => (dirname, env = getCurrentEnv()) => {
  const [first, ...rest] = configs.map((cfg) => cfg(dirname, env));
  const config = merge([first, ...rest]);
  const configSet = new Set<string>();
  const plugins = config.plugins
    ?.slice()
    .reverse()
    .filter(({ name }) => {
      if (!configSet.has(name)) {
        configSet.add(name);
        return true;
      }
      return false;
    })
    .reverse();
  return { ...config, plugins };
};
