import React from 'react';

import { ReactComponent as Call } from 'assets/icons/call.svg';
import { ReactComponent as Camera } from 'assets/icons/camera.svg';
import { ReactComponent as Options } from 'assets/icons/options.svg';
import face from 'assets/images/face-male-3.jpg';
import Avatar from 'components/Avatar';
import Paragraph from 'components/Paragraph';
import Text from 'components/Text';
import Icon from 'components/Icon';

import StyledTitleBar, { Actions, Title } from './style';

interface TitleBarProps {
  children?: React.ReactNode;
}

function TitleBar({ children, ...rest }: TitleBarProps) {
  return (
    <StyledTitleBar {...rest}>
      <Avatar status="offline" src={face} />
      <Title>
        <Paragraph size="large">慕容天宇</Paragraph>
        <Paragraph type="secondary">
          <Text>离线</Text>
          <Text>· 最后阅读：3小时前</Text>
        </Paragraph>
      </Title>
      <Actions>
        <Icon opacity={0.3} icon={Call} />
        <Icon opacity={0.3} icon={Camera} />
        <Icon opacity={0.3} icon={Options} />
      </Actions>
    </StyledTitleBar>
  );
}

export default TitleBar;
