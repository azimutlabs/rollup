import { merge } from './merge';

describe('merge', () => {
  it('should deep merge without side effects', () => {
    const target = {
      c: {
        d: 3,
      },
    };

    expect(merge([target, { e: 's' }])).toStrictEqual({
      c: {
        d: 3,
      },
      e: 's',
    });
    expect(target).toStrictEqual({
      c: {
        d: 3,
      },
    });
  });

  it('should merge object with empty object', () => {
    expect(merge([{}, { a: 1 }])).toStrictEqual({ a: 1 });
  });

  it('should merge array by concat', () => {
    expect(
      merge([
        {
          output: [{ a: 1 }, { b: 2 }, { c: 3 }],
        },
        {
          output: { a: 8 },
        },
      ])
    ).toStrictEqual({
      output: [{ a: 1 }, { b: 2 }, { c: 3 }, { a: 8 }],
    });

    expect(merge([{ a: { b: 1 } }, { a: [{ b: 2 }] }])).toStrictEqual({ a: [{ b: 1 }, { b: 2 }] });
  });

  it('should merge 4 objects', () => {
    expect(merge([{ a: 1 }, { b: 3 }, { c: { d: 5 } }, { c: { e: 6 } }])).toStrictEqual({
      a: 1,
      b: 3,
      c: {
        d: 5,
        e: 6,
      },
    });
  });
});
