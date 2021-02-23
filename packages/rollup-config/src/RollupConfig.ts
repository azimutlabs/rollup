import callerPath from 'caller-path';
import { readdirSync } from 'fs';
import { dirname, resolve } from 'path';
import type { InputOption, OutputOptions, Plugin, RollupOptions } from 'rollup';

import { merge } from './services/merge';
import { nonNullableArray } from './services/nonNullableArray';
import type { RollupConfigPlugin } from './types/RollupConfigPlugin';
import type { RollupConfigPluginBuilder } from './types/RollupConfigPluginBuilder';
import type { RollupConfigPlugins } from './types/RollupConfigPlugins';

const sourceDir = 'src';
const outputDir = 'lib';

type MakeAdditionalPlugins<P extends Record<string, unknown>> = {
  readonly [K in keyof P]: RollupConfigPlugin<Partial<P[K]>>;
};

export class RollupConfig<P extends Record<string, unknown>> {
  public constructor(
    private readonly plugins: RollupConfigPlugins<P>,
    private readonly options?: Partial<RollupOptions>
  ) {}

  public readonly derive = <C extends Record<string, unknown>>(
    plugins: RollupConfigPlugins<C>,
    options?: Partial<RollupOptions>
  ): RollupConfig<C & P> =>
    new RollupConfig(
      merge([this.plugins, plugins]) as RollupConfigPlugins<C & P>,
      merge([this.options, options])
    );

  public readonly finalize = (
    additionalPlugins?: MakeAdditionalPlugins<P>,
    additionalOptions?: RollupOptions
  ): Error | RollupOptions => {
    const input = additionalOptions?.input ?? this.options?.input ?? this.getInput();
    if (input instanceof Error) return input;

    const output = additionalOptions?.output ?? this.options?.output ?? this.getOutput();
    if (output instanceof Error) return output;

    const plugins = this.getPlugins(additionalPlugins).concat(
      ...nonNullableArray([additionalOptions?.plugins, this.options?.plugins])
    );

    const essentialOptions: RollupOptions = { input, output, plugins };
    return merge<RollupOptions>([this.options, additionalOptions, essentialOptions]);
  };

  protected readonly getInput = (): Error | InputOption => {
    const callerFile = this.getCallerPath();
    if (callerFile instanceof Error) return callerFile;

    const callerDir = dirname(callerFile);
    const rootIndex = this.lookForIndex(callerDir);

    return rootIndex instanceof Error
      ? this.lookForIndex(resolve(callerDir, sourceDir))
      : rootIndex;
  };

  protected readonly getOutput = (): Error | OutputOptions => {
    const callerFile = this.getCallerPath();
    if (callerFile instanceof Error) return callerFile;
    return {
      preserveModules: true,
      dir: resolve(callerFile, outputDir),
    };
  };

  protected readonly getPlugins = (
    additionalPlugins: MakeAdditionalPlugins<P> = {} as MakeAdditionalPlugins<P>
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

  private readonly getCallerPath = (): Error | string =>
    callerPath({ depth: 1 }) ?? Error(`'caller-path' returned 'undefined'`);

  private readonly lookForIndex = (dir: string): Error | string => {
    const files = readdirSync(dir);
    const index = files.find((file) => file.match(/^index\.(?:\w+)$/gu));
    return index ? resolve(dir, index) : Error(`No potential index files found at '${dir}'`);
  };
}
