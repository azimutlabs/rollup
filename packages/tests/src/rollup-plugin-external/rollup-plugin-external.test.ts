import type { RollupPluginExternalOptions } from '@azimutlabs/rollup-plugin-external';
import { rollupPluginExternal } from '@azimutlabs/rollup-plugin-external';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import type { InputOptions, Plugin } from 'rollup';
import { rollup } from 'rollup';
import nodePolyfills from 'rollup-plugin-node-polyfills';

const mockRollup = async (
  rollupOptions: InputOptions,
  pluginOptions?: RollupPluginExternalOptions
): Promise<void> => {
  const bundle = await rollup({
    ...rollupOptions,
    plugins: [
      typescript({ tsconfig: false, allowSyntheticDefaultImports: true }),
      rollupPluginExternal(pluginOptions),
      nodePolyfills() as Plugin,
      nodeResolve(),
      commonjs(),
    ],
  });
  const result = await bundle.generate({ format: 'esm' });
  const [{ code }] = result.output;
  expect(code).toMatchSnapshot();
};

describe('plugin-external', () => {
  it('should have a name', () => {
    expect(rollupPluginExternal().name).toEqual('@azimutlabs/rollup-plugin-external');
  });

  it('should handle dependencies', async () => {
    await mockRollup({ input: path.resolve(__dirname, './example.ts') });
  });

  it('should handle disabling dependencies', async () => {
    await mockRollup(
      { input: path.resolve(__dirname, './example.ts') },
      { useDependencies: false }
    );
  });

  it('should handle disabling builtins', async () => {
    await mockRollup({ input: path.resolve(__dirname, './example.ts') }, { useBuiltins: false });
  });

  it('should handle disabling peer dependencies', async () => {
    await mockRollup(
      { input: path.resolve(__dirname, './example.ts') },
      { usePeerDependencies: false }
    );
  });
});
