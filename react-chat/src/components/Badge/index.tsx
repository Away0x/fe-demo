import React from 'react';

import StyledBadge, { Count } from './style';

interface BadgeProps {
  children?: React.ReactNode;
  show?: boolean;
  count?: number;
  showZero?: boolean;
}

function Badge({
  children,
  show = false,
  count = 0,
  showZero = false,
  ...rest
}: BadgeProps) {
  return (
    <StyledBadge
      variant={children ? 'dot' : 'default'}
      show={show}
      count={count}
      showZero={showZero}
      {...rest}>
      {children || <Count>{count}</Count>}
    </StyledBadge>
  );
}

export default Badge;
