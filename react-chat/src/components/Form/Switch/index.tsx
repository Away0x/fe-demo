import React from 'react';

import StyledSwitch, { Checkbox, Slider } from './style';

interface SwitchProps {
  children?: React.ReactNode;
}

function Switch({ children, ...rest }: SwitchProps) {
  return (
    <StyledSwitch {...rest}>
      <Checkbox />
      <Slider />
    </StyledSwitch>
  );
}

export default Switch;
