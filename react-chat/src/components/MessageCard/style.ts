import styled, { css } from 'styled-components';

import Text from 'components/Text';
import Paragraph from 'components/Paragraph';
import Badge from 'components/Badge';
import StyledAvatar from 'components/Avatar/style';
import { card, activeBar } from 'tools/mixins';

const Name: any = styled(Text).attrs({ size: 'large' })`
  grid-area: name;
`;

const Time: any = styled(Text).attrs({
  size: 'medium',
  type: 'secondary',
})`
  grid-area: time;
  justify-self: end;
`;

const Status: any = styled(Text).attrs({ type: 'secondary' })`
  grid-area: status;
`;

interface MessageProps {
  replied: boolean;
}

const Message = styled.div<MessageProps>`
  grid-area: message;
  display: grid;
  grid-template-columns: 1fr 30px;
  align-items: center;
  ${({ replied }) =>
    replied &&
    css`
      grid-template-columns: 24px 1fr 30px;
    `}
`;

const MessageText = styled(Paragraph).attrs({ ellipsis: true })``;

const UnreadBadge: any = styled(Badge)`
  justify-self: end;
`;

interface StyledMessageCardProps {
  active: boolean;
}

const StyledMessageCard = styled.div<StyledMessageCardProps>`
  ${card()};
  display: grid;
  grid-template-areas:
    'avatar name time'
    'avatar status status'
    'message message message';
  grid-template-columns: 64px 1fr 1fr;
  row-gap: 16px;
  background: ${({ theme }) => theme.background};
  transition: 0.4s;
  &:hover {
    box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.1);
  }

  ${StyledAvatar} {
    grid-area: avatar;
  }

  ${({ active }) =>
    active &&
    css`
      background: ${({ theme }) => theme.darkPurple};
      ${Name}, ${Status}, ${Time}, ${MessageText} {
        color: white;
      }
      ${Status}, ${Time} {
        opacity: 0.4;
      }
      ${activeBar({ barWidth: '4px', shadowWidth: '14px' })}

      /* 隐藏指示条露在外边的部分 */
      overflow: hidden;`}
`;

export default StyledMessageCard;

export { Name, Time, Status, Message, MessageText, UnreadBadge };
