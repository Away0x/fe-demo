import React from 'react';

import { Types, Shapes } from './type';
import StyledButton from './style';

interface ButtonProps {
  children: React.ReactNode;
  type?: Types;
  shape?: Shapes;
  size?: string;
  bgColor?: string;
  onClick?: () => void;
}

function Button({
  type = 'primary',
  shape = 'circle',
  size = '30px',
  bgColor,
  children,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      {...rest}
      btntype={type}
      shape={shape}
      size={size}
      bgColor={bgColor}
      onClick={onClick}>
      {children}
    </StyledButton>
  );
}

export default Button;
