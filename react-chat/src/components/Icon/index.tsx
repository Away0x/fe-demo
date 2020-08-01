import React, { FunctionComponent, SVGAttributes } from 'react';

import StyledIcon from './style';

type SVGReactComponent = FunctionComponent<SVGAttributes<any>>;

interface IconProps {
  icon: SVGReactComponent;
  width?: number | string;
  height?: number | string;
  color?: string;
  opacity?: number;
  style?: React.CSSProperties;
}

function Icon({
  icon: IconComponet,
  color,
  opacity,
  style,
  width = 24,
  height = 24,
  ...rest
}: IconProps) {
  return (
    <StyledIcon {...rest} color={color} opacity={opacity} style={style}>
      {IconComponet && <IconComponet width={width} height={height} />}
    </StyledIcon>
  );
}

export default Icon;
