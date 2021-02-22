import { reduce, right } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import isValid from 'is-valid-path';
import { cwd } from 'process';

export const example = (): boolean => {
  const startWith = 'prefix';
  const dir = cwd();

  const concat = (aa: string, bb: string): string => `${dir}:${aa}:${bb}`;

  return isValid(pipe(right('e'), reduce(startWith, concat)));
};
