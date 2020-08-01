import React, { useState } from 'react';

import StyledPopover, { Content, Triangle, Target } from './style';

interface PopoverProps {
  content: React.ReactNode;
  offset?: { x?: string; y?: string };
  onVisible?: () => void;
  onHide?: () => void;
  children: React.ReactNode;
}

function Popover({
  content,
  offset,
  onVisible,
  onHide,
  children,
  ...rest
}: PopoverProps) {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    if (visible) {
      setVisible(false);
      onHide && onHide();
    } else {
      setVisible(true);
      onVisible && onVisible();
    }
  };

  return (
    <StyledPopover onClick={handleClick} {...rest}>
      <Content visible={visible} offset={offset}>
        {content}
      </Content>
      <Triangle visible={visible} offset={offset} />
      <Target>{children}</Target>
    </StyledPopover>
  );
}

export default Popover;
