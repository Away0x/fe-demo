import React from 'react';

import Text from 'components/Text';

import StyledLabelContainer from './style';

interface LabelContainerProps {
  label?: string;
  children?: React.ReactNode;
}

function LabelContainer({ label, children, ...rest }: LabelContainerProps) {
  return (
    <StyledLabelContainer {...rest}>
      {label && <Text style={{ marginBottom: '8px' }}>{label}: </Text>}
      {children}
    </StyledLabelContainer>
  );
}

export default LabelContainer;
