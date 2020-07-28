import styled, { css } from 'styled-components';
import StyledText from 'components/Text/style';

interface StyledParagraphProps {
  ellipsis?: boolean;
}

const StyledParagraph: any = styled(StyledText)<StyledParagraphProps>`
  ${({ ellipsis }) =>
    ellipsis &&
    css`
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    `}
`;

export default StyledParagraph;
