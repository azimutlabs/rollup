import callerPath from 'caller-path';
import { readdirSync } from 'fs';
import { dirname, resolve } from 'path';
import type { InputOption, OutputOptions, RollupOptions } from 'rollup';

import { merge } from '../services/merge';

const sourceDir = 'src';
const outputDir = 'lib';

export class Config {
  public constructor(private readonly options: Partial<RollupOptions>) {}

  public readonly finalize = (additionalOptions?: RollupOptions): Error | RollupOptions => {
    const input = additionalOptions?.input ?? this.options.input ?? this.getInput();
    if (input instanceof Error) return input;

    const output = additionalOptions?.output ?? this.options.output ?? this.getOutput();
    if (output instanceof Error) return output;

    const essentialOptions: RollupOptions = { input, output };
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

  private readonly getCallerPath = (): Error | string =>
    callerPath({ depth: 1 }) ?? Error(`'caller-path' returned 'undefined'`);

  private readonly lookForIndex = (dir: string): Error | string => {
    const files = readdirSync(dir);
    const index = files.find((file) => file.match(/^index\.(?:\w+)$/gu));
    return index ? resolve(dir, index) : Error(`No potential index files found at '${dir}'`);
  };
}
