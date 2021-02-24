import { rollupConfigEssentials } from '@azimutlabs/rollup-config-essentials';
import rollupPluginBabel from '@rollup/plugin-babel';

import type { RollupConfigBabelPlugins } from './types/RollupConfigBabelPlugins';

export const rollupConfigBabel = rollupConfigEssentials.derive<RollupConfigBabelPlugins>(() => ({
  external: {
    checkForBabelMacro: true,
  },
  babel: [
    rollupPluginBabel,
    {
      skipPreflightCheck: true,
      babelHelpers: 'runtime',
    },
  ],
}));

export const babel = rollupConfigBabel.finalize.bind(rollupConfigBabel);
