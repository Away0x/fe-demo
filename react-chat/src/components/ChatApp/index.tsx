import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import NavBar from 'components/NavBar';
import MessageList from 'components/MessageList';
import Conversation from 'components/Conversation';
import Profile from 'components/Profile';
import ContactList from 'components/ContactList';
import FileList from 'components/FileList';
import NoteList from 'components/NoteList';
import EditProfile from 'components/EditProfile';
import Settings from 'components/Settings';
import BlockedList from 'components/BlockedList';
import VideoCall from 'components/VideoCall';

import StyledChatApp, { Nav, Sidebar, Drawer, Content } from './style';

interface ChatAppProps {
  children?: React.ReactNode;
}

function ChatApp({ children, ...rest }: ChatAppProps) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [videoCalling, setVideoCalling] = useState(false);

  return (
    <StyledChatApp {...rest}>
      <Nav>
        <NavBar />
      </Nav>
      <Sidebar>
        <Switch>
          <Route exact path="/">
            <MessageList />
          </Route>
          <Route exact path="/contacts">
            <ContactList />
          </Route>
          <Route exact path="/files">
            <FileList />
          </Route>
          <Route exact path="/notes">
            <NoteList />
          </Route>
          <Route path="/settings">
            <EditProfile />
          </Route>
        </Switch>
      </Sidebar>
      <Content>
        {videoCalling && (
          <VideoCall onHangOffClicked={() => setVideoCalling(false)} />
        )}
        <Switch>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/settings/blocked">
            <BlockedList />
          </Route>
          <Route path="/">
            <Conversation
              onAvatarClick={() => setShowDrawer(true)}
              onVideoClicked={() => setVideoCalling(true)}
            />
          </Route>
        </Switch>
      </Content>
      <Drawer show={showDrawer}>
        <Profile onCloseClick={() => setShowDrawer(false)} />
      </Drawer>
    </StyledChatApp>
  );
}

export default ChatApp;
