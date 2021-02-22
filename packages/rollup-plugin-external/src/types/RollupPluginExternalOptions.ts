export type RollupPluginExternalOptions = {
  /**
   * Directory or path to package.json
   * defaults to process.cwd()
   */
  readonly packagePath?: string;
  /**
   * Indicated whether to check package.json for macro dependencies
   * defaults to false
   */
  readonly checkForBabelMacro?: boolean;
  /**
   * Indicated whether to include builtins
   * defaults to true
   */
  readonly useBuiltins?: boolean;
  /**
   * Indicated whether to include dependencies from package.json
   * defaults to true
   */
  readonly useDependencies?: boolean;
  /**
   * Indicated whether to include peer dependencies from package.json
   * defaults to true
   */
  readonly usePeerDependencies?: boolean;
};
