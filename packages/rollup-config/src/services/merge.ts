import lodashCloneDeep from 'lodash.clonedeep';
import lodashMerge from 'lodash.mergewith';

import type { NonEmptyArray } from './types/NonEmptyArray';

const customizer = <V, S>(target: readonly V[], source: S): readonly V[] | undefined => {
  if (Array.isArray(target)) return target.concat(source);
  else if (Array.isArray(source)) return [target, ...source];
  // Rule is disabled because mergeWith from lodash requires undefined for default merge
  // eslint-disable-next-line no-undefined
  return undefined;
};

export const merge = <V>(args: NonEmptyArray<V | null | undefined>): V => {
  const [target, ...values] = args.filter(
    (value): value is NonNullable<V> => value !== null && typeof value !== 'undefined'
  );
  return lodashMerge(lodashCloneDeep(target), ...values, customizer) as V;
};
