import React from 'react';

import StyledEmoji from './style';

interface EmojiProps {
  label: string;
  children: React.ReactNode;
}

function Emoji({ children, label, ...rest }: EmojiProps) {
  return (
    <StyledEmoji role="img" aria-label={label} {...rest}>
      {children}
    </StyledEmoji>
  );
}

export default Emoji;
