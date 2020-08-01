import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from 'components/Button';

interface SocialIconProps {
  icon: any;
  bgColor?: string;
  href?: string;
}

function SocialIcon({ icon, bgColor, href, ...rest }: SocialIconProps) {
  return (
    <Button
      size="30px"
      bgColor={bgColor}
      onClick={() => href && window.open(href, '_blank')}
      {...rest}>
      <FontAwesomeIcon icon={icon} style={{ fontSize: '16px' }} />
    </Button>
  );
}

export default SocialIcon;
