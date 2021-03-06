import React, { useState } from 'react';
import { useTheme } from 'styled-components';

import { ReactComponent as ClipIcon } from 'assets/icons/clip.svg';
import { ReactComponent as SmileIcon } from 'assets/icons/smile.svg';
import { ReactComponent as MicrophoneIcon } from 'assets/icons/microphone.svg';
import { ReactComponent as PlaneIcon } from 'assets/icons/plane.svg';
import { ReactComponent as OptionsIcon } from 'assets/icons/options.svg';
import Input from 'components/Form/Input';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Emoji from 'components/Icon/Emoji';
import Popover from 'components/Popover';

import StyledFooter, { IconContainer, StyledPopoverContent } from './style';

interface FooterProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

function Footer({ style, children, ...rest }: FooterProps) {
  const [emojiIconActive, setEmojiIconActive] = useState(false);
  const theme = useTheme();

  return (
    <StyledFooter {...rest} style={style}>
      <Input
        placeholder="输入想和对方说的话"
        prefix={<Icon icon={ClipIcon} />}
        suffix={
          <IconContainer>
            <Popover
              content={<PopoverContent />}
              offset={{ x: '-25%' }}
              onVisible={() => setEmojiIconActive(true)}
              onHide={() => setEmojiIconActive(false)}>
              <Icon
                icon={SmileIcon}
                color={emojiIconActive ? undefined : theme.gray3}
              />
            </Popover>
            <Icon icon={MicrophoneIcon} />
            <Button size="52px">
              <Icon
                icon={PlaneIcon}
                color="white"
                style={{ transform: 'translateX(-2px)' }}
              />
            </Button>
          </IconContainer>
        }
      />
    </StyledFooter>
  );
}

/* eslint-disable jsx-a11y/accessible-emoji */
function PopoverContent() {
  return (
    <StyledPopoverContent>
      <Emoji label="smile">😊</Emoji>
      <Emoji label="grinning">😆</Emoji>
      <Emoji label="thumbup">👍</Emoji>
      <Emoji label="indexfingerup">☝️</Emoji>
      <Emoji label="ok">👌</Emoji>
      <Emoji label="handsputtogether">🙏</Emoji>
      <Emoji label="smilewithsunglasses">😎</Emoji>
      <Emoji label="flexedbicep">💪</Emoji>
      <Icon icon={OptionsIcon} style={{ marginLeft: '24px' }} />
    </StyledPopoverContent>
  );
}

export default Footer;
