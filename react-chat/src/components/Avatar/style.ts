import styled, { css } from 'styled-components';

import { circle } from 'tools/mixins';

import { StatusTypes } from './type';

const circleMixinFunc = (color: string, size = '8px') => css`
  content: '';
  display: block;
  position: absolute;
  ${circle(color, size)}
`;

const StyledAvatar = styled.div`
  position: relative;
`;

interface StatusIconProps {
  readonly size: string;
  readonly status: StatusTypes;
}

const StatusIcon = styled.div<StatusIconProps>`
  position: absolute;
  left: 2px;
  top: 4px;
  ${({ size }) => circleMixinFunc('white', size)}

  &::before {
    ${({ size }) => circleMixinFunc('white', size)}
    transform: scale(2);
  }

  &::after {
    ${({ theme, status, size }) => {
      if (status === 'online') {
        return circleMixinFunc(theme.green, size);
      } else if (status === 'offline') {
        return circleMixinFunc(theme.gray, size);
      }
    }}
  }
`;

interface AvatarClipProps {
  size: string;
}

const AvatarClip = styled.div<AvatarClipProps>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  overflow: hidden;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center; /** 图片居中 */
`;

export default StyledAvatar;
export { StatusIcon, AvatarClip, AvatarImage };
