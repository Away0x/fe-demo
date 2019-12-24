import React, { forwardRef, MouseEvent } from 'react';
import styled from 'styled-components';

import helpers from '@/assets/style/helpers';

const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: ${helpers.font_color_light};
  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  >h1 {
    font-size: ${helpers.font_size_l};
    font-weight: 700;
  }
`;

interface HeaderProps {
  title?: string;
  handleClick?: (event: MouseEvent) => void;
}

const Header = forwardRef<HTMLDivElement, HeaderProps>(({
  title = '标题',
  handleClick = (e) => {},
}, ref) => {
  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={handleClick}>&#xe655;</i>
      <h1>{title}</h1>
    </HeaderContainer>
  )
});

export default React.memo<typeof Header>(Header);
