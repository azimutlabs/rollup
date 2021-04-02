import type { ColorsRecord } from '@azimutlabs/rollup-example-mono-repo.colors';
import { Colors } from '@azimutlabs/rollup-example-mono-repo.colors';
import styled from '@emotion/styled';
import type { TwStyle } from 'twin.macro';
import tw from 'twin.macro';

import type { InputProps } from './props';

const inputColors: ColorsRecord<TwStyle, InputProps['color']> = {
  [Colors.Accent]: tw`border-indigo-500 bg-white`,
  [Colors.Danger]: tw`border-red-500 bg-red-100`,
};

export const Input = styled.input<InputProps>`
  ${tw`h-12 w-full rounded border px-4`}
  ${({ color }) => inputColors[color]}
`;
