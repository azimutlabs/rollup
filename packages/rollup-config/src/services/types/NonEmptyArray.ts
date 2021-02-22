export type NonEmptyArray<V, K extends number = 0> = readonly V[] &
  {
    readonly [VK in K]: V;
  };
