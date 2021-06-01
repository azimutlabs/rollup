/**
 * RollupConfigInputInject is used to inject `rootDir` option using rollup' `loadConfigFile`.
 * @private
 */
export abstract class RollupConfigInjectOptions {
  public abstract get rootDir(): string;
}
