import React, { useState } from 'react';

import Filter from 'components/Filter';
import Select from 'components/Form/Select';
import Option from 'components/Form/Option';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Input from 'components/Form';
import MessageCard from 'components/MessageCard';
import { ReactComponent as Plus } from 'assets/icons/plus.svg';
import face1 from 'assets/images/face-male-1.jpg';

import StyledMessageList, { ChatList } from './style';

function ChatFilter() {
  return (
    <Filter style={{ padding: '20px 0' }}>
      <Filter.Filters label="列表排序">
        <Select>
          <Option>最新消息优先</Option>
          <Option>在线好友优先</Option>
        </Select>
      </Filter.Filters>

      <Filter.Action label="创建会话">
        <Button>
          <Icon icon={Plus} width={12} height={12} />
        </Button>
      </Filter.Action>
    </Filter>
  );
}

interface MessageListProps {
  children: React.ReactNode;
}

function MessageList({ children, ...rest }: MessageListProps) {
  const [active, setActive] = useState(3);

  return (
    <StyledMessageList {...rest}>
      <Input.Search />
      <ChatFilter />
      <ChatList>
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <MessageCard
            onClick={() => setActive(index)}
            key={index}
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
        ))}
      </ChatList>
    </StyledMessageList>
  );
}

export default MessageList;
