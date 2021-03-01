import type { Envs } from '../services/types/Envs';

export type RollupConfigPluginBuildersOptions = {
  /**
   * Directory that claims to have `index.*` file as an entry point.
   */
  readonly sourceDir: string;
  /**
   * Output directory where the compilation output will be emitted to.
   */
  readonly outputDir: string;
  /**
   * Directory that should be considered working directory of a package.
   */
  readonly rootDir: string;
  /**
   * NODE_ENV environment.
   */
  readonly env: Envs;
};
