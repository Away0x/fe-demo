import React from 'react';

import StyledText from './style';
import { Types, Sizes } from './type';

interface TextProps {
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
}: TextProps) {
  return (
    <StyledText type={type} size={size} bold={!!bold}>
      {children}
    </StyledText>
  );
}

export default Text;
