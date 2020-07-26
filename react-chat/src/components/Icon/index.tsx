import React, { FunctionComponent, SVGAttributes } from 'react';

import StyledIcon from './style';

type SVGReactComponent = FunctionComponent<SVGAttributes<any>>

interface IconProps {
  icon: SVGReactComponent;
  width?: number | string;
  height?: number | string;
  color?: string;
  opacity?: number;
}

function Icon({
  icon: IconComponet,
  color,
  opacity,
  width = 24,
  height = 24
}: IconProps) {
  return (
    <StyledIcon color={color} opacity={opacity}>
      {IconComponet && <IconComponet width={width} height={height} />}
    </StyledIcon>
  );
}

export default Icon;
