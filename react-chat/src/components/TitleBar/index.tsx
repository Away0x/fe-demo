import React from 'react';

import Avatar from 'components/Avatar';
import Paragraph from 'components/Paragraph';
import Text from 'components/Text';
import Icon from 'components/Icon';
import { DropdownItem } from 'components/Dropdown/style';
import Dropdown from 'components/Dropdown';
import Seperator from 'components/Seperator';

import { ReactComponent as Call } from 'assets/icons/call.svg';
import { ReactComponent as Camera } from 'assets/icons/camera.svg';
import { ReactComponent as Options } from 'assets/icons/options.svg';
import face from 'assets/images/face-male-3.jpg';

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
        <Dropdown
          content={
            <>
              <DropdownItem>
                <Paragraph>个人资料</Paragraph>
              </DropdownItem>
              <DropdownItem>
                <Paragraph>关闭会话</Paragraph>
              </DropdownItem>
              <Seperator />
              <DropdownItem>
                <Paragraph type="danger">屏蔽此人</Paragraph>
              </DropdownItem>
            </>
          }>
          <Icon opacity={0.3} icon={Options} />
        </Dropdown>
      </Actions>
    </StyledTitleBar>
  );
}

export default TitleBar;
