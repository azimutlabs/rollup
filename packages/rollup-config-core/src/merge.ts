import lodashCloneDeep from 'lodash.clonedeep';
import lodashMerge from 'lodash.mergewith';

type NonEmptyArray<V, K extends number = 0> = readonly V[] &
  {
    readonly [VK in K]: V;
  };

const customizer = <V extends Readonly<Record<string, unknown>>, S>(
  target: readonly V[],
  source: S
): readonly V[] | undefined => {
  if (Array.isArray(target)) return target.concat(source);
  else if (Array.isArray(source)) return [target, ...source];
  // Rule is disabled because mergeWith from lodash requires undefined for default merge
  // eslint-disable-next-line no-undefined
  return undefined;
};

export const merge = <V extends Readonly<Record<string, unknown>>>([
  target,
  ...values
]: NonEmptyArray<V>): V => lodashMerge(lodashCloneDeep(target), ...values, customizer) as V;
