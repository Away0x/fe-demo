import React from 'react';
import { useTheme } from 'styled-components';

import Avatar from 'components/Avatar';
import { StatusTypes } from 'components/Avatar/type';
import { ReactComponent as Replied } from 'assets/icons/replied.svg';
import Icon from 'components/Icon';

import StyledMessageCard, {
  Name,
  Status,
  Time,
  Message,
  MessageText,
  UnreadBadge,
} from './style';

interface MessageCardProps {
  avatarSrc: string;
  avatarStatus?: StatusTypes;
  statusText?: string;
  name?: string;
  time?: string;
  message?: string;
  unreadCount?: number;
  active?: boolean;
  replied?: boolean;
  onClick?: () => void;
}

function MessageCard({
  avatarSrc,
  avatarStatus,
  statusText,
  name,
  time,
  message,
  unreadCount,
  active,
  replied,
  onClick,
  ...rest
}: MessageCardProps) {
  const theme = useTheme();

  return (
    <StyledMessageCard active={!!active} onClick={onClick} {...rest}>
      <Avatar status={avatarStatus} src={avatarSrc} />
      <Name>{name}</Name>
      <Status>{statusText}</Status>
      <Time>{time}</Time>
      <Message replied={!!replied}>
        {replied && (
          <Icon
            width={16}
            height={14}
            icon={Replied}
            color={active ? theme.inactiveColorDark : theme.inactiveColor}
            opacity={active ? 0.4 : 1}
            style={{
              justifyContent: 'start',
            }}
          />
        )}
        <MessageText>{message}</MessageText>
        <UnreadBadge count={unreadCount} />
      </Message>
    </StyledMessageCard>
  );
}

export default MessageCard;
