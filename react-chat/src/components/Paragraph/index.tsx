import React from 'react';

import { TextProps } from 'components/Text';

import StyledParagraph from './style';

interface ParagraphProps extends TextProps {
  ellipsis?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function Paragraph({ ellipsis, children, style, ...rest }: ParagraphProps) {
  return (
    <StyledParagraph ellipsis={ellipsis} style={style} {...rest}>
      {children}
    </StyledParagraph>
  );
}

export default Paragraph;
