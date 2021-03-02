import { resolve } from 'path';
import readPackage from 'read-pkg-up';

const defaultConfigFile = 'rollup.config.@(js|mjs|cjs)';

export const fromWorkspaces = (pattern = defaultConfigFile): readonly string[] => {
  const foundPackage = readPackage.sync();
  if (!foundPackage) return [];

  const { workspaces } = foundPackage.packageJson;
  if (!workspaces) return [];

  const spaces = Array.isArray(workspaces) ? workspaces : workspaces.packages;
  return spaces.map((workspace: string) => resolve(workspace, pattern));
};
