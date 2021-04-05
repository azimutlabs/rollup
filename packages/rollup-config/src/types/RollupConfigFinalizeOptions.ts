import type { RollupOptions } from 'rollup';

import type { Envs } from '../services/types/Envs';
import type { RollupConfigPlugins } from './RollupConfigPlugins';

export type RollupConfigFinalizeOptions<
  P extends Record<string, unknown>
> = Partial<RollupOptions> & {
  /**
   * Directory that claims to have `index.*` file as an entry point.
   */
  readonly sourceDir?: string;
  /**
   * Output directory where the compilation output will be emitted to.
   */
  readonly outputDir?: string;
  /**
   * NODE_ENV environment.
   */
  readonly env?: Envs;
  /**
   * Override plugin builder options.
   */
  readonly pluginBuilders?: RollupConfigPlugins<P>;
  /**
   * Indicate whether to generate sourcemaps. Defaults to `true`
   */
  readonly shouldGenerateSourcemaps?: boolean;
};
