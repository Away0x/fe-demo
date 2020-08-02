import React, { useState } from 'react';
import { animated } from 'react-spring';

import MessageCard from 'components/MessageCard';
import FilterList from 'components/FilterList';
import useStaggeredList from 'tools/hooks/useStaggeredList';

import messageData from 'data/messages';

import StyledMessageList, { ChatList } from './style';

interface MessageListProps {
  children?: React.ReactNode;
}

function MessageList({ children, ...rest }: MessageListProps) {
  const [active, setActive] = useState(2);
  const trailAnimes = useStaggeredList(messageData.length);

  return (
    <StyledMessageList {...rest}>
      <FilterList
        actionLabel="创建会话"
        options={['最新消息优先', '在线好友优先']}>
        <ChatList>
          {messageData.map((message: any, index) => (
            <animated.div key={message.id} style={trailAnimes[index]}>
              <MessageCard
                onClick={() => setActive(index)}
                active={index === active}
                replied={message.replied}
                avatarSrc={message.avatarSrc}
                name={message.name}
                avatarStatus={message.status}
                statusText={message.statusText}
                time={message.time}
                message={message.message}
                unreadCount={message.unreadCount}
              />
            </animated.div>
          ))}
        </ChatList>
      </FilterList>
    </StyledMessageList>
  );
}

export default MessageList;
