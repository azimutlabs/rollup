import { resolve } from 'path';
import readPackage from 'read-pkg-up';

const defaultConfigFile = 'rollup.config.js';

export const useWorkspaces = (pattern: string = defaultConfigFile): readonly string[] => {
  const foundPackage = readPackage.sync();
  if (!foundPackage) return [];

  const { workspaces } = foundPackage.packageJson;
  if (!workspaces) return [];

  return workspaces.map((workspace: string) => resolve(workspace, pattern));
};
