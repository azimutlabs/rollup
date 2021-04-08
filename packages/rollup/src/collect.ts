import { sync } from 'glob';
import { extname, resolve } from 'path';
import type { InternalModuleFormat, RollupOptions } from 'rollup';
import loadConfigFile from 'rollup/dist/loadConfigFile';

const formatByExtname: Record<string, InternalModuleFormat> = {
  js: 'es',
  mjs: 'es',
  cjs: 'cjs',
};

export const collect = async (
  filePatterns: readonly string[],
  cwd = process.cwd()
): Promise<readonly RollupOptions[]> => {
  const configPromises = filePatterns
    .flatMap((pattern) => sync(pattern, { cwd }) as readonly string[])
    .map(async (file) => {
      const format = formatByExtname[extname(file)];
      const { warnings, options } = await loadConfigFile(resolve(cwd, file), { format });

      warnings.flush();

      return options;
    });

  return Promise.all(configPromises).then((configs) => configs.flat());
};
