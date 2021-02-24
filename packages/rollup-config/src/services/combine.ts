import type { RollupConfigFinalize } from '../types/RollupConfigFinalize';
import { merge } from './merge';
import type { NonEmptyArray } from './types/NonEmptyArray';

export const combine = (configs: NonEmptyArray<RollupConfigFinalize>): RollupConfigFinalize => (
  dirname
) => {
  const [first, ...rest] = configs.map((cfg) => cfg(dirname));
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
