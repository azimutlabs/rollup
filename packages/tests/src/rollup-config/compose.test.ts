import { compose, RollupConfig } from '@azimutlabs/rollup-config';
import type { RollupOptions } from 'rollup';

describe('compose', () => {
  it('should return a tuple with two RollupOptions', () => {
    expect.assertions(2);

    const cfg1Options: RollupOptions = { shimMissingExports: true };
    const cfg2Options: RollupOptions = { treeshake: { moduleSideEffects: false } };

    const cfg1 = new RollupConfig(() => ({}), cfg1Options);
    const cfg2 = new RollupConfig(() => ({}), cfg2Options);

    const cfg1Finalize = cfg1.finalize();
    const cfg2Finalize = cfg2.finalize();

    const [cfg1RollupOptions, cfg2RollupOptions] = compose(cfg1Finalize, cfg2Finalize)(__dirname);

    expect(cfg1RollupOptions.shimMissingExports).toStrictEqual(cfg1Options.shimMissingExports);
    expect(cfg2RollupOptions.treeshake).toStrictEqual(cfg2Options.treeshake);
  });
});
