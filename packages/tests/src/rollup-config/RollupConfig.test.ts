import type { RollupConfigFinalizeOptions } from '@azimutlabs/rollup-config';
import { RollupConfig } from '@azimutlabs/rollup-config';
import { resolve } from 'path';
import type { InternalModuleFormat, Plugin, RollupOptions } from 'rollup';

describe('RollupConfig', () => {
  type Plugin1Options = {
    readonly option1: string;
    readonly option2?: number;
  };
  type Plugins = {
    readonly plugin1: Plugin1Options;
  };

  const plugin1: Plugin = { name: 'plugin1' };
  const plugin2: Plugin = { name: 'plugin2' };
  const config = new RollupConfig<Plugins>(() => ({
    plugin1: [() => plugin1, { option1: 'option1Value' }],
  }));

  it('finalize should return properly merged and valid RollupOptions', () => {
    expect.assertions(4);

    const format: InternalModuleFormat = 'cjs';
    const finalizeOptions: RollupConfigFinalizeOptions<Plugins> = {
      shimMissingExports: true,
      pluginBuilders: {
        plugin1: () => plugin2,
      },
    };

    const options = config.finalize(format, finalizeOptions)(resolve(__dirname));

    const pathToIndex = resolve(__dirname, './src/index.js');
    const pathToLib = resolve(__dirname, './lib');

    expect(options.input).toStrictEqual(pathToIndex);
    expect(options.plugins).toStrictEqual([plugin2]);
    expect(options.shimMissingExports).toStrictEqual(finalizeOptions.shimMissingExports);
    expect(options.output).toStrictEqual({
      format,
      exports: 'auto',
      sourcemap: true,
      entryFileNames: `[name].[format].js`,
      preserveModules: true,
      dir: pathToLib,
    });
  });

  it('derive should return properly merged and valid RollupConfig', () => {
    expect.assertions(2);

    type OtherPluginOptions = {
      readonly option2: string;
    };
    type OtherPlugins = {
      readonly otherPlugin1: OtherPluginOptions;
      readonly otherPlugin2: OtherPluginOptions;
    };

    const pluginAdditionalOptions: Partial<Plugin1Options> = { option1: 'changed' };
    const otherPlugin1: Plugin = { name: 'otherPlugin1', options: () => null };
    // eslint-disable-next-line no-void
    const otherPlugin2: Plugin = { name: 'otherPlugin2', load: () => void 0 };

    const additionalOptions: RollupOptions = { shimMissingExports: true };

    const otherConfig1 = config.derive<OtherPlugins>(
      () => ({
        plugin1: [() => plugin2, pluginAdditionalOptions],
        otherPlugin1: [() => otherPlugin1, { option2: '' }],
        otherPlugin2: [() => otherPlugin2, { option2: '' }],
      }),
      additionalOptions
    );

    const options = otherConfig1.finalize()(__dirname);

    expect(options.plugins).toStrictEqual([plugin2, otherPlugin1, otherPlugin2]);
    expect(options.shimMissingExports).toStrictEqual(additionalOptions.shimMissingExports);
  });
});
