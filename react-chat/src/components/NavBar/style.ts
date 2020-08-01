import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import StyledAvatar, { StatusIcon } from 'components/Avatar/style';
import { activeBar } from 'tools/mixins';

const StyledNavBar = styled.div`
  display: grid;
  grid-template-rows: 1fr 4fr;
  width: 100px;
  height: 100vh;
  background-color: ${({ theme }) => theme.darkPurple};
  padding: 30px 0;

  ${StyledAvatar} {
    justify-self: center;
    ${StatusIcon} {
      &::before {
        background-color: ${({ theme }) => theme.darkPurple};
      }
    }
  }
`;

interface StyledMenuItemProps {
  active: boolean;
}

const StyledMenuItem = styled.div<StyledMenuItemProps>`
  & > a {
    width: 100%;
    height: 74px;

    display: flex;
    align-items: center;
    justify-content: center;

    ${activeBar()};
    ${({ active }) => (active ? '' : `&::before, &::after {height: 0}`)};

    &:hover {
      /* 指示条动画 */
      ::before,
      ::after {
        height: 100%;
      }

      /* 图标动画 */
      svg {
        transform: scale(1.2);
        opacity: 1;
      }
    }
  }
`;

const MenuIcon = styled(FontAwesomeIcon)<StyledMenuItemProps>`
  color: white;
  font-size: 24px;
  opacity: ${({ active }) => (active ? 1 : 0.3)};

  transform: scale(1);
  transition: 0.4s;
`;

const MenuItems = styled.div`
  display: grid;
  grid-template-rows: repeat(5, minmax(auto, 88px)) 1fr;
`;

export default StyledNavBar;

export { MenuIcon, MenuItems, StyledMenuItem };
