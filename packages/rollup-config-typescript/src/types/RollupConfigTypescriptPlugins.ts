import type { TypescriptPluginOptions } from '@wessberg/rollup-plugin-ts';

export type RollupConfigTypescriptPlugins = {
  readonly typescript: Partial<TypescriptPluginOptions>;
};
