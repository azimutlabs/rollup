import {
  rollupConfigEssentials,
  rollupConfigEssentialsExtensions,
} from '@azimutlabs/rollup-config-essentials';
import type { CustomTransformerFactories } from '@rollup/plugin-typescript';
import rollupPluginTypescript from '@rollup/plugin-typescript';
import zerollupTsTransformPaths from '@zerollup/ts-transform-paths';
import { findSync } from 'tsconfig';

import type { RollupConfigTypescriptPlugins } from './types/RollupConfigTypescriptPlugins';

export const rollupConfigTypescriptExtensions = [
  ...rollupConfigEssentialsExtensions,
  '.ts',
  '.tsx',
];

export const rollupConfigTypescript = rollupConfigEssentials.derive<RollupConfigTypescriptPlugins>(
  ({ rootDir }) => {
    const transformPaths = zerollupTsTransformPaths();
    const before = [transformPaths.before] as CustomTransformerFactories['before'];
    const afterDeclarations = [
      transformPaths.afterDeclarations,
    ] as CustomTransformerFactories['afterDeclarations'];

    return {
      nodeResolve: {
        extensions: rollupConfigTypescriptExtensions,
      },
      typescript: [
        rollupPluginTypescript,
        {
          tsconfig: findSync(rootDir) || false,
          transformers: {
            before,
            afterDeclarations,
          },
        },
      ],
    };
  }
);

export const typescript = rollupConfigTypescript.finalize.bind(rollupConfigTypescript);
