enum ResultTypes {
  Ok = '_ok',
  Err = '_err',
}

type ResultBase<T extends ResultTypes, V> = {
  readonly type: T;
  readonly value: V;
};

export type Ok<R> = ResultBase<ResultTypes.Ok, R>;
export type Err<E> = ResultBase<ResultTypes.Err, E>;

export type Result<R, E> = Err<E> | Ok<R>;

const buildBase = <T extends ResultTypes, V>(type: T, value: V): ResultBase<T, V> => ({
  type,
  value,
});

export const ok = <R>(value: R): Ok<R> => buildBase(ResultTypes.Ok, value);
export const err = <E>(value: E): Err<E> => buildBase(ResultTypes.Err, value);
export const fold = <R, E, V>(
  result: Result<R, E>,
  onOk: (value: R) => V,
  onErr: (value: E) => V
): V => {
  if (result.type === ResultTypes.Err) return onErr(result.value);
  return onOk(result.value);
};
