import React from 'react';

import { TextProps } from 'components/Text';

import StyledParagraph from './style';

interface ParagraphProps extends TextProps {
  ellipsis?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}

function Paragraph({
  ellipsis,
  onClick,
  children,
  style,
  ...rest
}: ParagraphProps) {
  return (
    <StyledParagraph
      ellipsis={ellipsis}
      style={style}
      {...rest}
      onClick={onClick}>
      {children}
    </StyledParagraph>
  );
}

export default Paragraph;
