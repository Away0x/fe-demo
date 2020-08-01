import React, { FunctionComponent, SVGAttributes } from 'react';

import StyledIcon from './style';
import SocialIcon from './SocialIcon';

type SVGReactComponent = FunctionComponent<SVGAttributes<any>>;

interface IconProps {
  icon: SVGReactComponent;
  width?: number | string;
  height?: number | string;
  color?: string;
  opacity?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}

function Icon({
  icon: IconComponet,
  color,
  opacity,
  style,
  width = 24,
  height = 24,
  onClick,
  ...rest
}: IconProps) {
  return (
    <StyledIcon
      {...rest}
      color={color}
      opacity={opacity}
      style={style}
      onClick={onClick}>
      {IconComponet && <IconComponet width={width} height={height} />}
    </StyledIcon>
  );
}

Icon.Social = SocialIcon;

export default Icon;
