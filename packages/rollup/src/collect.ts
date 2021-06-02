import { RollupConfig, RollupConfigInjectOptions } from '@azimutlabs/rollup-config';
import { sync } from 'glob';
import { resolve } from 'path';
import type { RollupOptions } from 'rollup';
import loadConfigFile from 'rollup/dist/loadConfigFile';

import { sortDependencies } from './sortDependencies';

const configFilePattern = 'rollup.config.@(js|mjs|cjs)';

export const collect = (packages: readonly string[]) => async (
  dirnameOrOptions: RollupOptions | string
): Promise<readonly RollupOptions[]> => {
  const rootDir = RollupConfig.getRootDir(dirnameOrOptions);

  const packagePaths = packages.flatMap(
    (pattern) => sync(pattern, { cwd: rootDir }) as readonly string[]
  );

  const configPromises = sortDependencies(packagePaths).map(async (pkg) => {
    const absolutePkgPath = resolve(rootDir, pkg);

    const [firstFoundFile] = sync(configFilePattern, { cwd: absolutePkgPath });
    if (!firstFoundFile) return null;

    class InjectOptions extends RollupConfigInjectOptions {
      // eslint-disable-next-line class-methods-use-this
      public get rootDir(): string {
        return absolutePkgPath;
      }
    }

    const { warnings, options } = await loadConfigFile(
      resolve(absolutePkgPath, firstFoundFile),
      new InjectOptions()
    );

    warnings.flush();

    return options;
  });

  return Promise.all(configPromises).then((configs) =>
    configs.flat().filter((it): it is RollupOptions => it !== null)
  );
};
