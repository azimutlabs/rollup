import { existsSync, readdirSync } from 'fs';
import { resolve } from 'path';
import type {
  InputOption,
  InternalModuleFormat,
  OutputOptions,
  Plugin,
  RollupOptions,
} from 'rollup';

import { getCurrentEnv } from './services/getCurrentEnv';
import { merge } from './services/merge';
import { nonNullableArray } from './services/nonNullableArray';
import type { RollupConfigFinalize } from './types/RollupConfigFinalize';
import type { RollupConfigFinalizeOptions } from './types/RollupConfigFinalizeOptions';
import type { RollupConfigPluginBuilder } from './types/RollupConfigPluginBuilder';
import type { RollupConfigPluginBuilders } from './types/RollupConfigPluginBuilders';
import type { RollupConfigPluginBuildersGetter } from './types/RollupConfigPluginBuildersGetter';
import type { RollupConfigPluginBuildersOptions } from './types/RollupConfigPluginBuildersOptions';
import type { RollupConfigPlugins } from './types/RollupConfigPlugins';

const sourceDir = 'src';
const outputDir = 'lib';
const defaultFormat: InternalModuleFormat = 'es';

export class RollupConfig<P extends Record<string, unknown>> {
  public constructor(
    private readonly plugins: RollupConfigPluginBuildersGetter<P>,
    private readonly options?: Partial<RollupOptions>
  ) {}

  public readonly derive = <C extends Record<string, unknown>>(
    plugins: (
      options: RollupConfigPluginBuildersOptions
    ) => RollupConfigPluginBuilders<C> & RollupConfigPlugins<P>,
    options?: Partial<RollupOptions>
  ): RollupConfig<C & P> =>
    new RollupConfig(
      (opts) => this.mergePlugins<C>(this.plugins(opts), plugins(opts) as RollupConfigPlugins<C>),
      merge([this.options, options])
    );

  public readonly finalize = (
    format: InternalModuleFormat = defaultFormat,
    options: RollupConfigFinalizeOptions<P> = {}
  ): RollupConfigFinalize => (dirname, env = getCurrentEnv()) => {
    // eslint-disable-next-line functional/no-throw-statement
    if (!dirname) throw Error(`Received undefined 'dirname'`);

    const { pluginBuilders: additionalPlugins, ...additionalOptions } = options;

    const input = additionalOptions.input ?? this.options?.input ?? this.getInput(dirname);
    // eslint-disable-next-line functional/no-throw-statement
    if (input instanceof Error) throw input;

    const output =
      additionalOptions.output ?? this.options?.output ?? this.getOutput(dirname, format);
    const plugins = this.getPlugins({ dirname, env }, additionalPlugins).concat(
      ...nonNullableArray([additionalOptions.plugins, this.options?.plugins])
    );
    const essentialOptions: RollupOptions = { input, output, plugins };

    return merge<RollupOptions>([this.options, additionalOptions, essentialOptions]);
  };

  protected readonly getOutput = (
    dirname: string,
    format: InternalModuleFormat
  ): OutputOptions => ({
    format,
    entryFileNames: `[name].[format].js`,
    preserveModules: true,
    dir: resolve(dirname, outputDir),
  });

  protected readonly getPlugins = (
    options: RollupConfigPluginBuildersOptions,
    additionalPlugins: RollupConfigPlugins<P> = {} as RollupConfigPlugins<P>
  ): readonly Plugin[] => {
    const mergedPlugins = this.mergePlugins(this.plugins(options), additionalPlugins);
    return Object.values(mergedPlugins).map(([builder, opts]) => builder(opts));
  };

  protected readonly getInput = (dirname: string): Error | InputOption => {
    const sourceDirectory = this.getSourceDir(dirname);
    if (sourceDirectory instanceof Error) return sourceDirectory;

    const indexFile = this.findIndexFile(readdirSync(sourceDirectory));
    if (!indexFile) return Error(`Couldn't find any index.* file at '${sourceDirectory}'`);

    return resolve(sourceDirectory, indexFile);
  };

  protected readonly getSourceDir = (dirname: string): Error | string => {
    const potentialSourceDir = resolve(dirname, sourceDir);
    return existsSync(potentialSourceDir)
      ? potentialSourceDir
      : Error(`Couldn't find source (./${sourceDir}) directory relative to '${dirname}'`);
  };

  private readonly findIndexFile = (files: readonly string[]): string | undefined =>
    files.find((file) => file.match(/^index\.(?:\w+)$/gu));

  private readonly mergePlugins = <C extends Record<string, unknown>>(
    pluginBuilders: RollupConfigPluginBuilders<P>,
    additionalPlugins: RollupConfigPlugins<C>
  ): RollupConfigPluginBuilders<C & P> => {
    const entries = Object.entries(additionalPlugins);
    const plugins = entries.reduce((acc, [key, value]) => {
      const pluginBuilderByKey = pluginBuilders[key];
      if (typeof pluginBuilderByKey === 'undefined') return { ...acc, [key]: value };

      const [pluginBuilder, pluginBuilderOptions] = pluginBuilderByKey;
      // Handle case where value is RollupConfigPluginBuilder.
      if (this.isPluginBuilder(value)) {
        return { ...acc, [key]: [value, pluginBuilderOptions] };
      }
      // Handle case where value is RollupConfigPluginBuilderWithOptions.
      if (Array.isArray(value)) {
        const [additionalPluginBuilder, additionalPluginBuilderOptions] = value;
        const options = merge([pluginBuilderOptions, additionalPluginBuilderOptions]);
        return { ...acc, [key]: [additionalPluginBuilder, options] };
      }
      // Default to merging value with already available plugin builder options.
      return {
        ...acc,
        [key]: [pluginBuilder, merge([pluginBuilderOptions, value])],
      };
    }, {}) as RollupConfigPluginBuilders<C & P>;
    return { ...pluginBuilders, ...plugins };
  };

  private readonly isPluginBuilder = <O>(value: unknown): value is RollupConfigPluginBuilder<O> =>
    typeof value === 'function';
}
