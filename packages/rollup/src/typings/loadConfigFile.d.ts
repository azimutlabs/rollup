declare module 'rollup/dist/loadConfigFile' {
  import type { InputOptions, OutputOptions, RollupOptions } from 'rollup';
  import type { RollupConfigInjectOptions } from '@azimutlabs/rollup-config';

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
   * @param commandOptions - should be command line options. OutputOption & RollupOptions is an alternative.
   * @private
   */
  function loadConfigFile(
    fileName: string,
    commandOptions?: InputOptions & OutputOptions & RollupConfigInjectOptions
  ): Promise<LoadConfigFileResult>;

  export = loadConfigFile;
}
