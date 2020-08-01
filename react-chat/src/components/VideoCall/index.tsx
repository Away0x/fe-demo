import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompressAlt,
  faMicrophone,
  faPhoneSlash,
  faVolumeMute,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';

import Avatar from 'components/Avatar';
import Paragraph from 'components/Paragraph';
import videoCaller from 'assets/images/video-caller.jpg';
import face from 'assets/images/face-male-1.jpg';

import StyledVideoCall, {
  Minimize,
  Actions,
  Action,
  Self,
  VideoCallAlert,
} from './style';

interface VideoCallProps {
  onHangOffClicked?: () => void;
  children?: React.ReactNode;
}

function VideoCall({ onHangOffClicked, children, ...rest }: VideoCallProps) {
  const [fullScreen, setFullScreen] = useState(true);

  if (!fullScreen) {
    return (
      <VideoCallAlert>
        <Avatar src={face} style={{ gridArea: 'avater' }} />
        <Paragraph size="medium" style={{ gridArea: 'info' }}>
          正在跟 李铭浩 进行视频通话
        </Paragraph>
        <Paragraph
          type="secondary"
          style={{ gridArea: 'action', cursor: 'pointer' }}
          onClick={() => setFullScreen(true)}>
          点击切换全屏
        </Paragraph>
        <FontAwesomeIcon
          icon={faVideo}
          style={{
            gridArea: 'icon',
            fontSize: '20px',
            justifySelf: 'end',
            opacity: 0.3,
          }}
        />
      </VideoCallAlert>
    );
  }

  return (
    <StyledVideoCall src={videoCaller} {...rest}>
      <Minimize shape="rect" onClick={() => setFullScreen(false)}>
        <FontAwesomeIcon icon={faCompressAlt} />
      </Minimize>
      <Actions>
        <Action>
          <FontAwesomeIcon icon={faMicrophone} />
        </Action>
        <Action type="hangoff">
          <FontAwesomeIcon icon={faPhoneSlash} onClick={onHangOffClicked} />
        </Action>
        <Action>
          <FontAwesomeIcon icon={faVolumeMute} />
        </Action>
      </Actions>
      <Self src={face} size="140px" />
    </StyledVideoCall>
  );
}

export default VideoCall;
