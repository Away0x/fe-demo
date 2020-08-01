import React from 'react';

import StyledSelect from './style';

interface SelectProps {
  children: React.ReactNode;
}

function Select({ children, ...rest }: SelectProps) {
  return <StyledSelect {...rest}>{children}</StyledSelect>;
}

export default Select;
