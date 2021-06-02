/**
 * RollupConfigInjectOptions is used to inject `rootDir` option using
 * rollup' `loadConfigFile`' `commandOptions` argument.
 * @private
 */
export abstract class RollupConfigInjectOptions {
  public abstract get rootDir(): string;
}
