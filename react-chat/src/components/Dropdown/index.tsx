import React, { useState, useRef } from 'react';

import useClickOutside from 'tools/hooks/useClickOutside';

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
  const elRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useClickOutside(elRef, () => {
    setVisible(false);
  });

  return (
    <StyledDropdown ref={elRef} onClick={() => setVisible(!visible)} {...rest}>
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
