declare module 'rollup/dist/loadConfigFile' {
  import type { OutputOptions, RollupOptions } from 'rollup';

  export type BatchedWarnings = {
    readonly count: number;
    readonly flush: () => void;
  };

  export type LoadConfigFileResult = {
    readonly warnings: BatchedWarnings;
    readonly options: readonly RollupOptions[];
  };

  /**
   * @param fileName - path to config.
   * @param commandOptions - should be command line options. OutputOption is an alternative.
   * @private
   */
  function loadConfigFile(
    fileName: string,
    commandOptions?: OutputOptions
  ): Promise<LoadConfigFileResult>;

  export = loadConfigFile;
}
