import React from 'react';

import StyledSeperator from './style';

interface SeperatorProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

function Seperator({ children, style, ...rest }: SeperatorProps) {
  return (
    <StyledSeperator style={style} {...rest}>
      {children}
    </StyledSeperator>
  );
}

export default Seperator;
