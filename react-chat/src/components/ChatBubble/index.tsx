import React from 'react';

import { ReactComponent as BubbleTipIcon } from 'assets/icons/bubbleTip.svg';

import { Types } from './type';
import StyledChatBubble, {
  Bubble,
  BubbleTip,
  Time,
  MessageText,
} from './style';

interface ChatBubbleProps {
  type?: Types;
  time: string;
  children: React.ReactNode;
}

function ChatBubble({ type, time, children, ...rest }: ChatBubbleProps) {
  return (
    <StyledChatBubble type={type} {...rest}>
      <Bubble>
        <BubbleTip icon={BubbleTipIcon} width={40} height={28} color="white" />
        <MessageText>{children}</MessageText>
      </Bubble>
      <Time>{time}</Time>
    </StyledChatBubble>
  );
}

export default ChatBubble;
