import { resolve } from 'path';
import readPackage from 'read-pkg-up';

import { sortDependencies } from './sortDependencies';

const defaultConfigFile = 'rollup.config.@(js|mjs|cjs)';

export const fromWorkspaces = (pattern = defaultConfigFile): readonly string[] => {
  const foundPackage = readPackage.sync();
  if (!foundPackage) return [];

  const { workspaces } = foundPackage.packageJson;
  if (!workspaces) return [];

  const spaces = Array.isArray(workspaces) ? workspaces : workspaces.packages;
  return sortDependencies(spaces).map((workspace: string) => resolve(workspace, pattern));
};
