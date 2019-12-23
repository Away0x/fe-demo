import styled from 'styled-components';

import helpers from '@/assets/style/helpers';

export const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  >span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${helpers.font_size_m};
  }
`;

export const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${helpers.font_size_m};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${helpers.theme_color};
    border: 1px solid ${helpers.theme_color};
    opacity: 0.8;
  }
`;
