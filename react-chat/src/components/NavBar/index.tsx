import React, { CSSProperties } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
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
  to?: string;
  showBadge?: boolean;
  icon: any;
  style?: CSSProperties;
}

function MenuItem({ to, icon, showBadge, ...rest }: MenuItemProps) {
  const loc = useLocation();
  const active = !!matchPath(loc.pathname, {
    path: to,
    exact: to === '/',
  });

  return (
    <StyledMenuItem active={active} {...rest}>
      <Link to={to || ''}>
        <Badge show={showBadge}>
          <MenuIcon active={active} icon={icon} />
        </Badge>
      </Link>
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
        <MenuItem to="/" showBadge icon={faCommentDots} />
        <MenuItem to="/contacts" icon={faUsers} />
        <MenuItem to="/files" icon={faFolder} />
        <MenuItem to="/notes" icon={faStickyNote} />
        <MenuItem icon={faEllipsisH} />
        <MenuItem
          to="/settings"
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
