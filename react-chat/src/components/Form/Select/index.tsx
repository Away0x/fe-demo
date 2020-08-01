import React from 'react';

import LabelContainer from 'components/Form/LabelContainer';

import StyledSelect from './style';

interface SelectProps {
  label?: string;
  type?: 'form';
  children: React.ReactNode;
}

function Select({ label, type, children, ...rest }: SelectProps) {
  const selectWithoutLabel = (
    <StyledSelect type={type} {...rest}>
      {children}
    </StyledSelect>
  );

  return label ? (
    <LabelContainer label={label}>selectWithoutLabel</LabelContainer>
  ) : (
    selectWithoutLabel
  );
}

export default Select;
