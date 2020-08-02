import React, { useState, useRef, useEffect } from 'react';

import useClickOutside from 'tools/hooks/useClickOutside';

import StyledPopover, { Content, Triangle, Target } from './style';

interface PopoverProps {
  content?: React.ReactNode;
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
  const elRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  useClickOutside(elRef, () => {
    setVisible(false);
  });

  useEffect(() => {
    if (visible) {
      onVisible && onVisible();
    } else {
      onHide && onHide();
    }
  }, [visible, onHide, onVisible]);

  return (
    <StyledPopover ref={elRef} onClick={handleClick} {...rest}>
      <Content visible={visible} offset={offset}>
        {content}
      </Content>
      <Triangle visible={visible} offset={offset} />
      <Target>{children}</Target>
    </StyledPopover>
  );
}

export default Popover;
