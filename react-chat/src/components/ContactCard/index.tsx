import React from 'react';

import Avatar from 'components/Avatar';
import { StatusTypes } from 'components/Avatar/type';

import StyledContactCard, { Intro, Name } from './style';

interface ContactCardProps {
  status?: StatusTypes;
  avatar: string;
  intro?: string;
  name?: string;
  children?: React.ReactNode;
}

function ContactCard({
  status = 'online',
  avatar,
  intro,
  name,
  children,
  ...rest
}: ContactCardProps) {
  return (
    <StyledContactCard {...rest}>
      <Avatar src={avatar} status={status} />
      <Name>{name}</Name>
      <Intro>{intro}</Intro>
    </StyledContactCard>
  );
}

export default ContactCard;
