import { RollupConfig } from '@azimutlabs/rollup-config';
import { rollupPluginExternal } from '@azimutlabs/rollup-plugin-external';

import type { RollupConfigEssentialsPlugins } from './types/RollupConfigEssentialsPlugins';

export const rollupConfigEssentials = new RollupConfig<RollupConfigEssentialsPlugins>({
  external: [rollupPluginExternal, {}],
});

export default rollupConfigEssentials.finalize;
