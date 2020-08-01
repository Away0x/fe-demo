import React, { useState } from 'react';

import { Align } from './type';
import StyledDropdown, { DropdownContainer } from './style';

interface DropdownProps {
  align?: Align;
  content?: React.ReactNode;
  children?: React.ReactNode;
}

function Dropdown({
  content,
  align = 'right',
  children,
  ...rest
}: DropdownProps) {
  const [visible, setVisible] = useState(false);

  return (
    <StyledDropdown onClick={() => setVisible(!visible)} {...rest}>
      {children}
      {content && (
        <DropdownContainer align={align} visible={visible}>
          {content}
        </DropdownContainer>
      )}
    </StyledDropdown>
  );
}

export default Dropdown;
