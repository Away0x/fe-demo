import React, { useState } from 'react';
import { animated } from 'react-spring';

import MessageCard from 'components/MessageCard';
import FilterList from 'components/FilterList';
import face1 from 'assets/images/face-male-1.jpg';
import useStaggeredList from 'tools/hooks/useStaggeredList';

import StyledMessageList, { ChatList } from './style';

interface MessageListProps {
  children?: React.ReactNode;
}

function MessageList({ children, ...rest }: MessageListProps) {
  const [active, setActive] = useState(3);
  const trailAnimes = useStaggeredList(6);

  return (
    <StyledMessageList {...rest}>
      <FilterList
        actionLabel="创建会话"
        options={['最新消息优先', '在线好友优先']}>
        <ChatList>
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <animated.div key={index} style={trailAnimes[index]}>
              <MessageCard
                onClick={() => setActive(index)}
                active={index === active}
                replied={index % 3 === 0}
                avatarSrc={face1}
                name="李铭浩"
                avatarStatus="online"
                statusText="在线"
                time="3 小时之前"
                message="即使爬到最高的山上，一次也只能脚踏实地地"
                unreadCount={2}
              />
            </animated.div>
          ))}
        </ChatList>
      </FilterList>
    </StyledMessageList>
  );
}

export default MessageList;
