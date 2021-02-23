import { rollupConfigEssentials } from '@azimutlabs/rollup-config-essentials';
import rollupPluginBabel from '@rollup/plugin-babel';

import type { RollupConfigBabelPlugins } from './types/RollupConfigBabelPlugins';

export const rollupConfigBabel = rollupConfigEssentials.derive<RollupConfigBabelPlugins>({
  babel: [
    rollupPluginBabel,
    {
      skipPreflightCheck: true,
      babelHelpers: 'runtime',
    },
  ],
});

export default rollupConfigBabel.finalize;
