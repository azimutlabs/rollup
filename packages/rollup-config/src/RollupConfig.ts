import { existsSync, readdirSync } from 'fs';
import { dirname, resolve } from 'path';
import readPkgUp from 'read-pkg-up';
import type {
  InputOption,
  InternalModuleFormat,
  OutputOptions,
  Plugin,
  RollupOptions,
} from 'rollup';
import { mergeOptions } from 'rollup/dist/shared/mergeOptions';

import { RollupConfigInjectOptions } from './RollupConfigInjectOptions';
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

const defaultSourceDir = 'src';
const defaultOutputDir = 'lib';
const defaultFormat: InternalModuleFormat = 'es';

export class RollupConfig<P extends Record<string, unknown>> {
  public constructor(
    private readonly plugins: RollupConfigPluginBuildersGetter<P>,
    private readonly options?: Partial<RollupOptions>
  ) {}

  public static readonly getRootDir = (dirnameOrOptions: RollupOptions | string): string => {
    if (typeof dirnameOrOptions === 'string') return dirnameOrOptions;

    const cwd = process.cwd();
    const cwdOrSrc =
      typeof dirnameOrOptions.input === 'string' ? dirname(dirnameOrOptions.input) : cwd;

    const packagePath = readPkgUp.sync({ cwd: cwdOrSrc });
    if (packagePath) return dirname(packagePath.path);

    return cwd;
  };

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

  public finalize(options?: RollupConfigFinalizeOptions<P>): RollupConfigFinalize;
  public finalize(
    format?: InternalModuleFormat,
    options?: RollupConfigFinalizeOptions<P>
  ): RollupConfigFinalize;
  public finalize(
    optionsOrFormat?: InternalModuleFormat | RollupConfigFinalizeOptions<P>,
    maybeOptions?: RollupConfigFinalizeOptions<P>
  ): RollupConfigFinalize {
    const format = typeof optionsOrFormat === 'string' ? optionsOrFormat : defaultFormat;
    const options = (typeof optionsOrFormat === 'object' ? optionsOrFormat : maybeOptions) ?? {};

    return (maybeRootDir) => {
      const cliOptions = typeof maybeRootDir === 'object' ? maybeRootDir : {};

      const maybeInjectedRootDir =
        cliOptions instanceof RollupConfigInjectOptions ? cliOptions.rootDir : null;

      const rootDir =
        options.rootDir ?? maybeInjectedRootDir ?? RollupConfig.getRootDir(maybeRootDir);

      /* eslint-disable functional/no-throw-statement */
      if (!rootDir) throw Error(`Received undefined 'rootDir'`);

      const {
        sourceDir,
        outputDir,
        shouldGenerateSourcemaps,
        env = getCurrentEnv(),
        pluginBuilders: additionalPlugins,
        ...additionalOptions
      } = options;

      const shouldGenerateSourcemap = shouldGenerateSourcemaps ?? true;

      const safeSourceDir = sourceDir ?? defaultSourceDir;
      const safeOutputDir = outputDir ?? defaultOutputDir;

      const inputOptions = cliOptions.input ?? additionalOptions.input ?? this.options?.input;
      const input = inputOptions ?? this.getInput(rootDir, safeSourceDir);
      // Throw input, if this.getInput is returning an Error.
      if (input instanceof Error) throw input;
      // We can't predicate the sourceDir if there is multiple entry points.
      if (typeof input !== 'string' && !sourceDir)
        throw Error(`'sourceDir' must be specified if 'RollupOptions.input' is not 'string'`);

      const outputOptions = cliOptions.output ?? additionalOptions.output ?? this.options?.output;
      // We can't predicate the outputDir if there is multiple output options.
      if (Array.isArray(outputOptions) && !outputDir)
        throw Error(`'outputDir' must be specified if 'RollupOptions.output' is an Array`);

      const predicatedOutput = this.getOutput(
        rootDir,
        safeOutputDir,
        shouldGenerateSourcemap,
        format
      );
      // If 'RollupOptions.output' turns out to be an Array, we have to iterate it and merge with 'predicatedOutput'.
      const output = Array.isArray(outputOptions)
        ? outputOptions.map((opts) => merge([predicatedOutput, opts]))
        : merge([predicatedOutput, outputOptions]);

      const pluginBuildersOptions: RollupConfigPluginBuildersOptions = {
        env,
        rootDir,
        sourceDir: typeof input === 'string' ? dirname(input) : safeSourceDir,
        outputDir: Array.isArray(output) ? safeOutputDir : output.dir ?? safeOutputDir,
      };

      const plugins = this.getPlugins(pluginBuildersOptions, additionalPlugins)
        .concat(...nonNullableArray([additionalOptions.plugins, this.options?.plugins]))
        .concat(...(cliOptions.plugins ?? []));

      // Ignoring because we already merged cliOptions before.
      // eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/no-unused-vars
      const { input: _input, output: _output, ...normalizedCliOptions } = mergeOptions(
        {},
        cliOptions
      );

      return merge<RollupOptions>([
        this.options,
        additionalOptions,
        normalizedCliOptions,
        { input, output, plugins },
      ]);
      /* eslint-enable functional/no-throw-statement */
    };
  }

  protected readonly getOutput = (
    rootDir: string,
    outputDir: string,
    sourcemap: boolean,
    format: InternalModuleFormat
  ): OutputOptions => ({
    format,
    sourcemap,
    exports: 'auto',
    preserveModules: true,
    entryFileNames: `[name].[format].js`,
    dir: resolve(rootDir, outputDir),
  });

  protected readonly getPlugins = (
    options: RollupConfigPluginBuildersOptions,
    additionalPlugins: RollupConfigPlugins<P> = {} as RollupConfigPlugins<P>
  ): readonly Plugin[] => {
    const mergedPlugins = this.mergePlugins(this.plugins(options), additionalPlugins);
    return Object.values(mergedPlugins).map(([builder, opts]) => builder(opts));
  };

  protected readonly getInput = (rootDir: string, sourceDir: string): Error | InputOption => {
    const sourceDirectory = this.getSourceDir(rootDir, sourceDir);
    if (sourceDirectory instanceof Error) return sourceDirectory;

    const indexFile = this.findIndexFile(readdirSync(sourceDirectory));
    if (!indexFile) return Error(`Couldn't find any index.* file at '${sourceDirectory}'`);

    return resolve(sourceDirectory, indexFile);
  };

  protected readonly getSourceDir = (rootDir: string, sourceDir: string): Error | string => {
    const potentialSourceDir = resolve(rootDir, sourceDir);
    return existsSync(potentialSourceDir)
      ? potentialSourceDir
      : Error(`Couldn't find source (./${sourceDir}) directory relative to '${rootDir}'`);
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
