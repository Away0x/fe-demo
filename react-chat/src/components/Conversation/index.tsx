import React from 'react';

import TitleBar from 'components/TitleBar';
import ChatBubble from 'components/ChatBubble';
import VoiceMessage from 'components/VoiceMessage';
import Emoji from 'components/Icon/Emoji';
import Footer from 'components/Footer';

import StyledConversation, { Conversations, MyChatBubble } from './style';

interface ConversationProps {
  children?: React.ReactNode;
}

/* eslint-disable jsx-a11y/accessible-emoji */
function Conversation({ children, ...rest }: ConversationProps) {
  return (
    <StyledConversation {...rest}>
      <TitleBar />
      <Conversations>
        <ChatBubble time="昨天 下午14：26">Hi 小宇，忙什么呢？</ChatBubble>
        <MyChatBubble time="昨天 下午16：30">
          Hello 啊！最近就是一直在加班改 bug，然后 怼产品，怼 UI，各种怼！
        </MyChatBubble>
        <ChatBubble time="昨天 下午18：30">
          <VoiceMessage time="01:24" />
        </ChatBubble>
        <MyChatBubble time="昨天 下午16：30">
          明天约一把王者荣耀，不连赢5把不罢休 🤘
          <Emoji label="smile">🤘</Emoji>
        </MyChatBubble>
      </Conversations>
      <Footer />
    </StyledConversation>
  );
}

export default Conversation;
