import React from 'react';

import face1 from 'assets/images/face-male-1.jpg';

import StyledAvatar, { StatusIcon, AvatarClip, AvatarImage } from './style';

interface AvatarProps {
  src: string;
  status?: 'online' | "offline";
  size?: string;
  statusIconSize?: string;
}

function Avatar({
  src = face1,
  size = '48px',
  status,
  statusIconSize = '8px',
  ...rest
}: AvatarProps) {
  return (
    <StyledAvatar>
      {status && (
        <StatusIcon status={status} size={statusIconSize}></StatusIcon>
      )}
      <AvatarClip size={size}>
        <AvatarImage src={src} alt="" />
      </AvatarClip>
    </StyledAvatar>
  );
}

export default Avatar;
