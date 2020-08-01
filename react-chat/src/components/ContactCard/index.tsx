import React from 'react';

import Avatar from 'components/Avatar';
import face from 'assets/images/face-male-1.jpg';

import StyledContactCard, { Intro, Name } from './style';

interface ContactCardProps {
  children?: React.ReactNode;
}

function ContactCard({ children, ...rest }: ContactCardProps) {
  return (
    <StyledContactCard {...rest}>
      <Avatar src={face} status="online" />
      <Name>李浩</Name>
      <Intro>我是前端工程师</Intro>
    </StyledContactCard>
  );
}

export default ContactCard;
