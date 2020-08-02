import React from 'react';
import { useSpring, animated } from 'react-spring';

import TitleBar from 'components/TitleBar';
import ChatBubble from 'components/ChatBubble';
import VoiceMessage from 'components/VoiceMessage';
import Emoji from 'components/Icon/Emoji';
import Footer from 'components/Footer';

import StyledConversation, { Conversations, MyChatBubble } from './style';

interface ConversationProps {
  onAvatarClick?: () => void;
  onVideoClicked?: () => void;
  children?: React.ReactNode;
}

/* eslint-disable jsx-a11y/accessible-emoji */
function Conversation({
  onAvatarClick,
  onVideoClicked,
  children,
  ...rest
}: ConversationProps) {
  const tBarAnimeProps = useSpring({
    opacity: 1,
    transform: 'translate3d(0px, 0px, 0px)',
    from: { opacity: 0, transform: 'translate3d(0px, -50px, 0px)' },
    delay: 500,
  });

  const convsAnimeProps = useSpring({
    opacity: 1,
    transform: 'translate3d(0px, 0px, 0px)',
    from: { opacity: 0, transform: 'translate3d(50px, 0px, 0px)' },
    delay: 800,
  });

  const ftAnimeProps = useSpring({
    opacity: 1,
    transform: 'translate3d(0px, 0px, 0px)',
    from: { opacity: 0, transform: 'translate3d(0px, 50px, 0px)' },
    delay: 950,
  });

  return (
    <StyledConversation {...rest}>
      <animated.div style={tBarAnimeProps}>
        <TitleBar
          onVideoClicked={onVideoClicked}
          onAvatarClick={onAvatarClick}
        />
      </animated.div>
      <Conversations style={convsAnimeProps}>
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
      <animated.div style={{ ...ftAnimeProps, ...{ width: '100%' } }}>
        <Footer />
      </animated.div>
    </StyledConversation>
  );
}

export default Conversation;
