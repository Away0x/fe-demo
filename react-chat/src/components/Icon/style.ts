import styled from 'styled-components';

interface StyledIconProps {
  color?: string;
  opacity?: number;
}

const StyledIcon = styled.div<StyledIconProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg,
  svg * {
    ${({ color }) => (color ? `fill: ${color}` : "")};
    ${({ opacity }) => (opacity ? `opacity: ${opacity}` : "")}
  }
`;

export default StyledIcon;
