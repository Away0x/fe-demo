import React from 'react';

import NavBar from 'components/NavBar';
import MessageList from 'components/MessageList';
import Conversation from 'components/Conversation';
import Profile from 'components/Profile';

import StyledChatApp, { Nav, Sidebar, Drawer, Content } from './style';

interface ChatAppProps {
  children?: React.ReactNode;
}

function ChatApp({ children, ...rest }: ChatAppProps) {
  return (
    <StyledChatApp {...rest}>
      <Nav>
        <NavBar />
      </Nav>
      <Sidebar>
        <MessageList />
      </Sidebar>
      <Content>
        <Conversation />
      </Content>
      <Drawer>
        <Profile />
      </Drawer>
    </StyledChatApp>
  );
}

export default ChatApp;
