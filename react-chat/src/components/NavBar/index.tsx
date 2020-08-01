import React, { CSSProperties } from 'react';
import {
  faCommentDots,
  faUsers,
  faFolder,
  faStickyNote,
  faEllipsisH,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

import Badge from 'components/Badge';
import Avatar from 'components/Avatar';
import profileImage from 'assets/images/face-male-1.jpg';

import StyledNavBar, { StyledMenuItem, MenuIcon, MenuItems } from './style';

interface MenuItemProps {
  active?: boolean;
  showBadge?: boolean;
  icon: any;
  style?: CSSProperties;
}

function MenuItem({ active, showBadge, icon, style, ...rest }: MenuItemProps) {
  return (
    <StyledMenuItem active={active ? 1 : 0} style={style} {...rest}>
      <a href="#/">
        <Badge show={showBadge}>
          <MenuIcon active={active ? 1 : 0} icon={icon} />
        </Badge>
      </a>
    </StyledMenuItem>
  );
}

interface NavBarProps {
  children?: React.ReactNode;
}

function NavBar({ children }: NavBarProps) {
  return (
    <StyledNavBar>
      <Avatar src={profileImage} status="online" />
      <MenuItems>
        <MenuItem showBadge active icon={faCommentDots} />
        <MenuItem icon={faUsers} />
        <MenuItem icon={faFolder} />
        <MenuItem icon={faStickyNote} />
        <MenuItem icon={faEllipsisH} />
        <MenuItem
          icon={faCog}
          style={{
            alignSelf: 'end',
          }}
        />
      </MenuItems>
    </StyledNavBar>
  );
}

export default NavBar;

export { MenuItem };
