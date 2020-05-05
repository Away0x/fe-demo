import React, { useContext, useState, useRef } from 'react';
import classNames from 'classnames';

import { MenuContext } from './Menu'
import { MenuItemProps } from './MenuItem'
import Icon from '../Icon';
import Transition from '../Transition';

export type SubMenuProps ={
  index?: string;
  title: string;

  className?: string;
};

const SubMenu: React.FC<SubMenuProps> = React.memo<SubMenuProps>(({
  index,
  title,

  className,

  children,
}) => {
  const timer = useRef<any>();
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus!;
  const isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
  const [menuOpen, setOpen] = useState(isOpend);

  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };

  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer.current);
    e.preventDefault();
    timer.current = setTimeout(() => {
      setOpen(toggle)
    }, 300);
  };

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {};

  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  } : {};

  const renderChildren = () => {
    const subMenuClasses = classNames('submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        })
      } else {
        console.error("Warning: SubMenu has a child which is not a MenuItem component")
      }
    });

    return (
      <Transition
        in={menuOpen}
        timeout={300}
        animation="zoom-in-top">
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    )
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
});

SubMenu.displayName = 'SubMenu';

export default SubMenu;
