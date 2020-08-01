import React from 'react';

import Icon from 'components/Icon';
import Text from 'components/Text';
import { ReactComponent as ArrowMenuLeft } from 'assets/icons/arrowMenuLeft.svg';
import { ReactComponent as closeCircle } from 'assets/icons/closeCircle.svg';
import face from 'assets/images/face-male-1.jpg';

import StyledBlockedList, {
  SettingsMenu,
  ClosableAvatar,
  BlockedAvatar,
  CloseIcon,
  BlockedName,
  FriendList,
} from './style';

interface BlockedListProps {
  children?: React.ReactNode;
}

function BlockedList({ children, ...rest }: BlockedListProps) {
  return (
    <StyledBlockedList {...rest}>
      <SettingsMenu>
        <Icon icon={ArrowMenuLeft} style={{ cursor: 'pointer' }} />
        <Text size="xxlarge">已屏蔽的好友</Text>
      </SettingsMenu>
      <FriendList>
        {new Array(8).fill(0).map((_, i) => {
          return (
            <ClosableAvatar key={i}>
              <BlockedAvatar size="105px" src={face} />
              <CloseIcon width={46} height={51} icon={closeCircle} />
              <BlockedName>李浩</BlockedName>
            </ClosableAvatar>
          );
        })}
      </FriendList>
    </StyledBlockedList>
  );
}

export default BlockedList;
