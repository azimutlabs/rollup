import type { RollupConfigPluginBuildersGetter } from '@azimutlabs/rollup-config';
import { combine, RollupConfig } from '@azimutlabs/rollup-config';
import type { Plugin, RollupOptions } from 'rollup';

describe('combine', () => {
  it('should return a single RollupOptions from two RollupConfigs', () => {
    expect.assertions(2);

    const banner = 'export const _a = `banner`';

    const cfg1Options: RollupOptions = { output: { strict: true, sourcemap: 'inline', dir: '1' } };
    const cfg2Options: RollupOptions = { output: { sourcemap: 'hidden', banner, dir: '2' } };

    const expectedMergeOptions: RollupOptions = {
      output: {
        // From cfg1Options.
        strict: true,
        // From cfg2Options override.
        banner,
        dir: '2',
        sourcemap: 'hidden',
        // From default this.getOutput behaviour.
        exports: 'auto',
        entryFileNames: '[name].[format].js',
        format: 'es',
        preserveModules: true,
      },
    };

    type Cfg1Plugins = {
      readonly plugin1: { readonly option1: string };
      readonly plugin2: { readonly option2: string };
    };
    type Cfg2Plugins = Pick<Cfg1Plugins, 'plugin1'>;

    const cfgPluginName = 'cfgPluginName';
    const cfg1Plugin1: Plugin = {
      name: cfgPluginName,
      options: () => null,
    };
    const cfg1Plugin2: Plugin = {
      name: 'anotherName',
      // eslint-disable-next-line no-void
      buildEnd: () => void 0,
    };
    const cfg2Plugin1: Plugin = {
      name: cfgPluginName,
      // eslint-disable-next-line no-void
      load: () => void 0,
    };

    const cfg1Plugins: RollupConfigPluginBuildersGetter<Cfg1Plugins> = () => ({
      plugin1: [() => cfg1Plugin1, { option1: 'option1Value' }],
      plugin2: [() => cfg1Plugin2, { option2: 'option2Value' }],
    });
    const cfg2Plugins: RollupConfigPluginBuildersGetter<Cfg2Plugins> = () => ({
      plugin1: [() => cfg2Plugin1, { option1: 'option2Value' }],
    });

    const cfg1 = new RollupConfig(cfg1Plugins, cfg1Options);
    const cfg2 = new RollupConfig(cfg2Plugins, cfg2Options);

    const rollupOptions = combine([cfg1.finalize.bind(cfg1), cfg2.finalize.bind(cfg2)])(__dirname);

    expect(rollupOptions.output).toStrictEqual(expectedMergeOptions.output);
    expect(rollupOptions.plugins).toStrictEqual([cfg1Plugin2, cfg2Plugin1]);
  });
});
