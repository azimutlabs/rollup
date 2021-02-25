import { collect } from '@azimutlabs/rollup';

describe('collect', () => {
  it('should work properly', async () => {
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

    const config = await collect(['**/rollup.config.js']);
    expect(config).toStrictEqual(result);
  });
});
