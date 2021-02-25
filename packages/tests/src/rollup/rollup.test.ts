import { collect, useWorkspaces } from '@azimutlabs/rollup';
import { resolve } from 'path';

const result = [
  {
    input: 'a.js',
    output: {
      file: 'a.js',
      format: 'cjs',
    },
  },
  {
    input: 'b.js',
    output: {
      file: 'b.js',
      format: 'esnext',
    },
  },
  {
    input: 'c.js',
    output: {
      file: 'c.js',
      format: 'cjs',
    },
  },
];

describe('rollup', () => {
  it('collect should work properly', async () => {
    const config = await collect(['**/rollup.config.js']);
    expect(config).toStrictEqual(result);
  });

  it('useWorkspaces should work properly with default parameter', () => {
    expect(useWorkspaces()).toStrictEqual([
      resolve('src/*/rollup.config.js'),
      resolve('packages/*/rollup.config.js'),
    ]);
  });

  it('useWorkspaces should work properly with given parameter', () => {
    expect(useWorkspaces('rollup.*.js')).toStrictEqual([
      resolve('src/*/rollup.*.js'),
      resolve('packages/*/rollup.*.js'),
    ]);
  });

  it('collect should work with useWorkspaces', async () => {
    const config = await collect(useWorkspaces('packages/*/rollup.config.js'));
    expect(config).toStrictEqual(result);
  });
});
