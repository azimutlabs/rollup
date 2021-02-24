import { readdirSync } from 'fs';
import { resolve } from 'path';
import type { InputOption, OutputOptions, Plugin, RollupOptions } from 'rollup';

import { merge } from './services/merge';
import { nonNullableArray } from './services/nonNullableArray';
import type { RollupConfigFinalize } from './types/RollupConfigFinalize';
import type { RollupConfigPluginBuilder } from './types/RollupConfigPluginBuilder';
import type { RollupConfigPluginBuilders } from './types/RollupConfigPluginBuilders';
import type { RollupConfigPlugins } from './types/RollupConfigPlugins';

const sourceDir = 'src';
const outputDir = 'lib';

export class RollupConfig<P extends Record<string, unknown>> {
  public constructor(
    private readonly plugins: RollupConfigPluginBuilders<P>,
    private readonly options?: Partial<RollupOptions>
  ) {}

  public readonly derive = <C extends Record<string, unknown>>(
    plugins: RollupConfigPluginBuilders<C>,
    options?: Partial<RollupOptions>
  ): RollupConfig<C & P> =>
    new RollupConfig(
      merge([this.plugins, plugins]) as RollupConfigPluginBuilders<C & P>,
      merge([this.options, options])
    );

  public readonly finalize = (
    additionalPlugins?: RollupConfigPlugins<P>,
    additionalOptions?: RollupOptions
  ): RollupConfigFinalize => (dirname) => {
    if (!dirname) throw Error(`Received undefined 'dirname'`);

    const input = additionalOptions?.input ?? this.options?.input ?? this.getInput(dirname);
    if (input instanceof Error) throw input;

    const output = additionalOptions?.output ?? this.options?.output ?? this.getOutput(dirname);
    const plugins = this.getPlugins(additionalPlugins).concat(
      ...nonNullableArray([additionalOptions?.plugins, this.options?.plugins])
    );
    const essentialOptions: RollupOptions = { input, output, plugins };

    return merge<RollupOptions>([this.options, additionalOptions, essentialOptions]);
  };

  protected readonly getInput = (dirname: string): Error | InputOption => {
    const rootIndex = this.lookForIndex(dirname);

    return rootIndex instanceof Error ? this.lookForIndex(resolve(dirname, sourceDir)) : rootIndex;
  };

  protected readonly getOutput = (dirname: string): OutputOptions => ({
    preserveModules: true,
    dir: resolve(dirname, outputDir),
  });

  protected readonly getPlugins = (
    additionalPlugins: RollupConfigPlugins<P> = {} as RollupConfigPlugins<P>
  ): readonly Plugin[] => {
    const entries = Object.entries(this.plugins);
    if (entries.length === 0) return [];

    return entries.map(([key, [valuePluginBuilder, valueOptions]]) => {
      const additionalPlugin = additionalPlugins[key];

      if (this.isPluginBuilder(additionalPlugin)) return additionalPlugin(valueOptions);
      if (Array.isArray(additionalPlugin)) {
        const [additionalPluginBuilder, additionalOptions] = additionalPlugin;
        const options = merge([valueOptions, additionalOptions]);
        const plugin = additionalPluginBuilder ?? valuePluginBuilder;
        return plugin(options);
      }

      return valuePluginBuilder(merge([valueOptions, additionalPlugin]));
    });
  };

  private readonly isPluginBuilder = <O>(value: unknown): value is RollupConfigPluginBuilder<O> =>
    typeof value === 'function';

  private readonly lookForIndex = (dir: string): Error | string => {
    const files = readdirSync(dir);
    const index = files.find((file) => file.match(/^index\.(?:\w+)$/gu));
    return index ? resolve(dir, index) : Error(`No potential index files found at '${dir}'`);
  };
}
