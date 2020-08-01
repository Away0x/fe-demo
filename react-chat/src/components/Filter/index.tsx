import React from 'react';

import Text from 'components/Text';

import StyledFilter, { Filters, Action } from './style';

interface FilterProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

function Filter({ children, style, ...rest }: FilterProps) {
  return (
    <StyledFilter style={style} {...rest}>
      {children}
    </StyledFilter>
  );
}

interface FiltersProps {
  children: React.ReactNode;
  label: string;
}

Filter.Filters = ({ children, label, ...rest }: FiltersProps) => (
  <Filters {...rest}>
    <Text type="secondary">{label}：</Text>
    {children}
  </Filters>
);
Filter.Action = ({ children, label, ...rest }: FiltersProps) => (
  <Action {...rest}>
    <Text type="secondary">{label}</Text>
    {children}
  </Action>
);

export default Filter;
