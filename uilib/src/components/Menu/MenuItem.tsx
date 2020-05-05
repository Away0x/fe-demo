import React, { useContext } from 'react';
import classNames from 'classnames';

import { MenuContext } from './Menu';

export type MenuItemProps = {
  index?: string;
  disabled?: boolean;

  className?: string;
  style?: React.CSSProperties;
};

const MenuItem: React.FC<MenuItemProps> = React.memo<MenuItemProps>(({
  index,
  disabled,

  className,
  style,

  children
}) => {
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  })

  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
