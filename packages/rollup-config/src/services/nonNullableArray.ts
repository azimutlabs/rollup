export const nonNullableArray = <V>(values: readonly V[]): ReadonlyArray<NonNullable<V>> =>
  values.filter((value): value is NonNullable<V> => typeof value !== 'undefined' && value !== null);
