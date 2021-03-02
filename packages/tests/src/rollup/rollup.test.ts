import { collect, fromWorkspaces } from '@azimutlabs/rollup';
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

  it('fromWorkspaces should work properly with default parameter', () => {
    expect(fromWorkspaces()).toStrictEqual([
      resolve('src/*/rollup.config.@(js|mjs|cjs)'),
      resolve('packages/*/rollup.config.@(js|mjs|cjs)'),
    ]);
  });

  it('fromWorkspaces should work properly with given parameter', () => {
    expect(fromWorkspaces('rollup.*.js')).toStrictEqual([
      resolve('src/*/rollup.*.js'),
      resolve('packages/*/rollup.*.js'),
    ]);
  });

  it('collect should work with fromWorkspaces', async () => {
    const config = await collect(fromWorkspaces('packages/*/rollup.config.js'));
    expect(config).toStrictEqual(result);
  });
});
