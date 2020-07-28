import React from 'react';

import StyledParagraph from './style';

interface ParagraphProps {
  children: React.ReactNode;
  ellipsis?: boolean;
}

function Paragraph({ ellipsis, children }: ParagraphProps) {
  return (
    <StyledParagraph as="p" ellipsis={ellipsis}>
      {children}
    </StyledParagraph>
  );
}

export default Paragraph;
