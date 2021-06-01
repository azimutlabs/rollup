declare module 'rollup/dist/shared/mergeOptions' {
  import type { OutputOptions, RollupOptions } from 'rollup';

  function mergeOptions(
    config: RollupOptions,
    commandOptions?: OutputOptions & RollupOptions
  ): RollupOptions;

  export { mergeOptions };
}
