import readPkgUp from 'read-pkg-up';

import { sortDependencies } from './sortDependencies';

export const fromWorkspaces = (): readonly string[] => {
  const foundPackage = readPkgUp.sync();
  if (!foundPackage) return [];

  const { workspaces } = foundPackage.packageJson;
  if (!workspaces) return [];

  const spaces = Array.isArray(workspaces) ? workspaces : workspaces.packages;
  return sortDependencies(spaces);
};
