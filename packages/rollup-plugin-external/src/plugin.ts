import getBuiltins from 'builtin-modules';
import isValid from 'is-valid-path';
import lodashConcat from 'lodash.concat';
import readPkg from 'read-pkg-up';
import type { InputOptions, Plugin } from 'rollup';

import type { RollupPluginExternalOptions } from './types/RollupPluginExternalOptions';

export const rollupPluginExternal = ({
  useBuiltins = true,
  useDependencies = true,
  usePeerDependencies = true,
  packagePath,
  checkForBabelMacro = false,
}: RollupPluginExternalOptions = {}): Plugin => ({
  name: '@azimutlabs/rollup-plugin-external',
  options: (opts: InputOptions) => {
    // Read package.json file
    const foundPackage = readPkg.sync({ cwd: packagePath });
    if (!foundPackage?.packageJson) return opts;

    // Extract dependencies from package.json
    const pkg = foundPackage.packageJson;
    const pkgDependencies = Object.keys(pkg.dependencies || {});
    const pkgPeerDependencies = Object.keys(pkg.peerDependencies || {});
    const macros = Object.keys(pkg.devDependencies || {}).filter((key) =>
      /[./]macro(?:\.c?js)?$/u.test(key)
    );

    // Filter dependencies according to options
    const ids = lodashConcat<string>(
      useDependencies ? pkgDependencies : [],
      usePeerDependencies ? pkgPeerDependencies : [],
      checkForBabelMacro ? macros : [],
      useBuiltins ? getBuiltins : []
    );

    return {
      ...opts,
      external: (source, importer, isResolved) => {
        if (typeof opts.external === 'function' && opts.external(source, importer, isResolved))
          return true;

        if (Array.isArray(opts.external) && opts.external.includes(source)) return true;

        // Check for exact package name
        if (ids.some((id) => id === source)) return true;

        // Check for package submodules
        const foundId = ids.find((id) => source.startsWith(`${id}/`));
        if (!foundId) return false;

        // Check for valid path of submodule
        return isValid(source.replace(foundId, ''));
      },
    };
  },
});
