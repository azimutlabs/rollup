import type { InternalModuleFormat } from 'rollup';

import type { RollupConfig } from '../RollupConfig';
import type { RollupConfigFinalize } from '../types/RollupConfigFinalize';
import type { RollupConfigFinalizeOptions } from '../types/RollupConfigFinalizeOptions';
import { merge } from './merge';

export const combine = <
  P extends Record<string, unknown>,
  C extends RollupConfig<P>['finalize'],
  A extends Parameters<C>
>(
  finalizers: readonly C[],
  format?: Extract<A[0], InternalModuleFormat>,
  options?: Extract<A[1], RollupConfigFinalizeOptions<P>>
): RollupConfigFinalize => (dirnameOrOptions) => {
  const [first, ...rest] = finalizers.map((cfg) => cfg(format, options)(dirnameOrOptions));
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
