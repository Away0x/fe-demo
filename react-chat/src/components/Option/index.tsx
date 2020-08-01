import React from 'react';

import StyledOption from './style';

interface OptionProps {
  children: React.ReactNode;
}

function Option({ children, ...rest }: OptionProps) {
  return <StyledOption {...rest}>{children}</StyledOption>;
}

export default Option;
