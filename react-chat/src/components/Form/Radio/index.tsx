import React from 'react';

import LabelContainer from 'components/Form/LabelContainer';

import StyledRadio, { RadioButton, Circle, StyledRadioGroup } from './style';

interface RadioProps {
  name?: string;
  children?: React.ReactNode;
}

function Radio({ name, children, ...rest }: RadioProps) {
  return (
    <StyledRadio {...rest}>
      {children}
      <RadioButton name={name} />
      <Circle />
    </StyledRadio>
  );
}

interface RadioGroupProps {
  label?: string;
  children?: React.ReactNode;
}

function RadioGroup({ label, children, ...rest }: RadioGroupProps) {
  return (
    <LabelContainer label={label}>
      <StyledRadioGroup {...rest}>{children}</StyledRadioGroup>
    </LabelContainer>
  );
}

Radio.Group = RadioGroup;

export default Radio;
