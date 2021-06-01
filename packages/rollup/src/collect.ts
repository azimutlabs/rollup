import { RollupConfigInjectOptions } from '@azimutlabs/rollup-config';
import { sync } from 'glob';
import { dirname, resolve } from 'path';
import readPkgUp from 'read-pkg-up';
import type { RollupOptions } from 'rollup';
import loadConfigFile from 'rollup/dist/loadConfigFile';

export const collect = async (
  filePatterns: readonly string[],
  cwd = process.cwd()
): Promise<readonly RollupOptions[]> => {
  const packagePath = readPkgUp.sync({ cwd })?.path ?? cwd;
  const rootDir = dirname(packagePath);

  const configPromises = filePatterns
    .flatMap((pattern) => sync(pattern, { cwd: rootDir }) as readonly string[])
    .map(async (file) => {
      class InjectOptions extends RollupConfigInjectOptions {
        // eslint-disable-next-line class-methods-use-this
        public get rootDir(): string {
          return dirname(file);
        }
      }

      const { warnings, options } = await loadConfigFile(resolve(cwd, file), new InjectOptions());

      warnings.flush();

      return options;
    });

  return Promise.all(configPromises).then((configs) => configs.flat());
};
