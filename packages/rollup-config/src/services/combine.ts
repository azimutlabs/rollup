import type { RollupConfigFinalize } from '../types/RollupConfigFinalize';
import { merge } from './merge';

export const combine = (
  // eslint-disable-next-line functional/functional-parameters
  ...configs: readonly [RollupConfigFinalize, ...(readonly RollupConfigFinalize[])]
): RollupConfigFinalize => (dirname, env) => {
  const [first, ...rest] = configs.map((cfg) => cfg(dirname, env));
  const config = merge([first, ...rest]);
  const configSet = new Set<string>(config.plugins?.map((plg) => plg.name));
  const plugins = config.plugins?.filter(({ name }) => {
    if (configSet.has(name)) {
      configSet.delete(name);
      return false;
    }
    return true;
  });
  return { ...config, plugins };
};
