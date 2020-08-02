import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

import Paragraph from 'components/Paragraph';
import Switch from 'components/Form/Switch';
import Icon from 'components/Icon';
import Seperator from 'components/Seperator';

import { ReactComponent as ArrowMenuRight } from 'assets/icons/arrowMenuRight.svg';

import StyledSettings, {
  StyledSettingsItem,
  SettingsItemControl,
  StyledSettingsGroup,
} from './style';

interface SettingsProps {
  children?: React.ReactNode;
}

function Settings({ children, ...rest }: SettingsProps) {
  const animeProps = useSpring({
    transform: 'translate3d(0px, 0px, 0px)',
    opacity: 1,
    from: { transform: 'translate3d(100px, 0px, 0px)', opacity: 0 },
    config: {
      tension: 140,
    },
    delay: 300,
  });

  return (
    <StyledSettings {...rest}>
      <animated.div style={animeProps}>
        <SettingsGroup groupName="隐私设置">
          <SettingsItem label="添加好友时需要验证" />
          <SettingsItem
            label="推荐通讯录好友"
            description="上传的通讯录只用来匹配好友列表，本应用不会记录和发送任何信息给其它机构或"
          />
          <SettingsItem label="只能通过手机号找到我" />
        </SettingsGroup>
        <SettingsGroup groupName="通知设置">
          <SettingsItem label="新消息通知" />
          <SettingsItem label="语音和视频通话提醒" />
          <SettingsItem label="显示通知详情" />
          <SettingsItem label="声音" />
          <Link
            to={`/settings/blocked`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}>
            <SettingsItem label="查看已静音的好友列表" type="menu" />
          </Link>
        </SettingsGroup>
      </animated.div>
    </StyledSettings>
  );
}

interface SettingsGroupProps {
  groupName?: string;
  children?: React.ReactNode;
}

function SettingsGroup({ groupName, children, ...rest }: SettingsGroupProps) {
  return (
    <StyledSettingsGroup>
      <Paragraph size="xxlarge" style={{ paddingBottom: '24px' }}>
        {groupName}
      </Paragraph>
      {children}
    </StyledSettingsGroup>
  );
}

interface SettingsItemProps {
  type?: 'switch' | 'menu';
  label?: string;
  description?: string;
  children?: React.ReactNode;
}

export function SettingsItem({
  type = 'switch',
  label,
  description,
  children,
  ...rest
}: SettingsItemProps) {
  return (
    <StyledSettingsItem {...rest}>
      <SettingsItemControl>
        <Paragraph size="large">{label}</Paragraph>
        {type === 'switch' && <Switch />}
        {type === 'menu' && <Icon icon={ArrowMenuRight} />}
      </SettingsItemControl>

      {description && (
        <Paragraph type="secondary" style={{ margin: '4px 0' }}>
          {description}
        </Paragraph>
      )}

      <Seperator style={{ marginTop: '8px', marginBottom: '20px' }} />
    </StyledSettingsItem>
  );
}

export default Settings;
