import { sync } from 'glob';
import { resolve } from 'path';
import type { RollupOptions } from 'rollup';

export const collect = async (
  filePatterns: readonly string[],
  dirname = process.cwd()
): Promise<readonly RollupOptions[]> =>
  Promise.all(
    filePatterns
      .flatMap((pattern) => sync(pattern) as readonly string[])
      .map(async (file) => import(resolve(dirname, file)).then((config) => config.default))
  );
