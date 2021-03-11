import { existsSync } from 'fs';
import { sync } from 'glob';
import { resolve } from 'path';
import readPackage from 'read-pkg';

import { Graph } from './graph';

export const sortDependencies = (spaces: readonly string[]): readonly string[] => {
  const workspacesDirectories = spaces.flatMap((pattern) => sync(pattern) as readonly string[]);
  const workspaceNames = new Map<string, string>();

  const workspaces = workspacesDirectories.reduce<{
    readonly resolvedPackages: readonly readPackage.NormalizedPackageJson[];
    readonly unresolvedPackages: readonly string[];
  }>(
    (acc, dirname) => {
      if (existsSync(dirname) && existsSync(resolve(dirname, 'package.json'))) {
        const packageJson = readPackage.sync({ cwd: dirname });
        workspaceNames.set(packageJson.name, dirname);
        return { ...acc, resolvedPackages: [...acc.resolvedPackages, packageJson] };
      }
      return { ...acc, unresolvedPackages: [...acc.unresolvedPackages, dirname] };
    },
    {
      resolvedPackages: [],
      unresolvedPackages: [],
    }
  );

  const workspacesPackages = workspaces.resolvedPackages;

  const graph = new Graph<string>();

  workspacesPackages.forEach((packageJson) => {
    if (packageJson.dependencies) {
      Object.keys(packageJson.dependencies).forEach((key) => {
        if (workspaceNames.has(key)) graph.addEdge(key, packageJson.name);
      });
    }
    if (packageJson.devDependencies) {
      Object.keys(packageJson.devDependencies).forEach((key) => {
        if (workspaceNames.has(key)) graph.addEdge(key, packageJson.name);
      });
    }
  });

  const sortedPackages = graph.topologicalSort();

  const nonDependencyPackages = workspacesPackages
    .filter((packageJson) => !sortedPackages.includes(packageJson.name))
    .map((packageJson) => workspaceNames.get(packageJson.name) as string);

  return [
    ...workspaces.unresolvedPackages,
    ...nonDependencyPackages,
    ...sortedPackages.map((packageName) => workspaceNames.get(packageName) as string),
  ];
};
