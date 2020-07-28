import React from 'react';

import StyledHeading from './style';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

function Heading({ level, children }: HeadingProps) {
  return <StyledHeading as={`h${level}`}>{children}</StyledHeading>;
}

export default Heading;
