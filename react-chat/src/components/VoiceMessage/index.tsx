import React from 'react';
import { useTheme } from 'styled-components';

import Button from 'components/Button';
import Icon from 'components/Icon';
import Text from 'components/Text';
import { ReactComponent as Play } from 'assets/icons/play.svg';
import { ReactComponent as Wave } from 'assets/icons/wave.svg';

import { Types } from './type';
import StyledVoiceMessage from './style';

interface VoiceMessageProps {
  type?: Types;
  time: string;
  children?: React.ReactNode;
}

function VoiceMessage({ type, time, children, ...rest }: VoiceMessageProps) {
  const theme = useTheme();

  return (
    <StyledVoiceMessage type={type} {...rest}>
      <Button size="40px">
        <Icon
          icon={Play}
          color="white"
          width="14"
          height="16"
          style={{ transform: 'translateX(1px)' }}
        />
      </Button>
      <Icon icon={Wave} width="100%" height="100%" color={theme.primaryColor} />
      <Text bold>{time}</Text>
    </StyledVoiceMessage>
  );
}

export default VoiceMessage;
