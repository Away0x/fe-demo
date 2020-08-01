import React from 'react';

import StyledText from './style';
import { Types, Sizes } from './type';

export interface TextProps {
  size?: Sizes;
  type?: Types;
  children: React.ReactNode;
  bold?: boolean;
}

function Text({
  children,
  type = 'primary',
  size = 'normal',
  bold,
  ...rest
}: TextProps) {
  return (
    <StyledText type={type} size={size} bold={!!bold} {...rest}>
      {children}
    </StyledText>
  );
}

export default Text;
