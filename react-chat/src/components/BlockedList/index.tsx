import React from 'react';
import { useHistory } from 'react-router-dom';

import Icon from 'components/Icon';
import Text from 'components/Text';
import { ReactComponent as ArrowMenuLeft } from 'assets/icons/arrowMenuLeft.svg';
import { ReactComponent as closeCircle } from 'assets/icons/closeCircle.svg';

import blockedData from 'data/blocked';

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
  const history = useHistory();

  return (
    <StyledBlockedList {...rest}>
      <SettingsMenu>
        <Icon
          icon={ArrowMenuLeft}
          style={{ cursor: 'pointer' }}
          onClick={() => history.goBack()}
        />
        <Text size="xxlarge">已屏蔽的好友</Text>
      </SettingsMenu>
      <FriendList>
        {blockedData.map((blocked) => {
          return (
            <ClosableAvatar key={blocked.id}>
              <BlockedAvatar size="105px" src={blocked.avatar} />
              <CloseIcon width={46} height={51} icon={closeCircle} />
              <BlockedName>{blocked.name}</BlockedName>
            </ClosableAvatar>
          );
        })}
      </FriendList>
    </StyledBlockedList>
  );
}

export default BlockedList;
