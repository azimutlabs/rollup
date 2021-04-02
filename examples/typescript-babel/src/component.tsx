import styled from '@emotion/styled/macro';
import { forwardRef } from 'react';
import type { TwStyle } from 'twin.macro';
import tw from 'twin.macro';

import type { ButtonProps } from './props';

const buttonStyles: Record<ButtonProps['variant'], TwStyle> = {
  raised: tw`bg-indigo-500 text-white`,
  flat: tw`text-indigo-500 bg-white`,
};

const ButtonStyled = styled.button<ButtonProps>`
  ${tw`p-2 rounded font-bold focus:ring focus:outline-none`}
  ${({ variant }) => buttonStyles[variant]}
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...rest }, ref) => (
  <ButtonStyled ref={ref} {...rest}>
    <span css={tw`content-center`}>{children}</span>
  </ButtonStyled>
));

Button.displayName = 'Button';
Button.defaultProps = {
  variant: 'raised',
};
