import React from 'react';

import { TextProps } from 'components/Text';

import StyledParagraph from './style';

interface ParagraphProps extends TextProps {
  ellipsis?: boolean;
  children: React.ReactNode;
}

function Paragraph({ ellipsis, children, ...rest }: ParagraphProps) {
  return (
    <StyledParagraph ellipsis={ellipsis} {...rest}>
      {children}
    </StyledParagraph>
  );
}

export default Paragraph;
