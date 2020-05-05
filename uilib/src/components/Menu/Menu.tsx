import React, { useState, useCallback, useMemo } from 'react';
import classNames from 'classnames';

import { MenuItemProps } from './MenuItem';

type MenuMode = 'horizontal' | 'vertical';

export type MenuProps = {
  className?: string;
  style?: React.CSSProperties;

  /** 默认 active 的菜单项的索引值 */
  defaultIndex?: string;
  /** 菜单类型 横向或者纵向 */
  mode?: MenuMode;
  /** 点击菜单项触发的回掉函数 */
  onSelect?: (selectedIndex: string) => void;
  /** 设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[];
}

type IMenuContext = {
  index: string;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
  onSelect?: (selectedIndex: string) => void;
};

export const MenuContext = React.createContext<IMenuContext>({ index: '0' });

/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 */
export const Menu: React.FC<MenuProps> = React.memo<MenuProps>(({
  mode = 'horizontal',
  defaultIndex = '0',
  defaultOpenSubMenus = [],
  onSelect,
  
  style,
  className,

  children,
}) => {
  const [currentActive, setActive] = useState(defaultIndex);

  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  });

  const handleClick = useCallback((index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }, [onSelect]);

  const passedContext: IMenuContext = useMemo(() => {
    return {
      index: currentActive ? currentActive : '0',
      onSelect: handleClick,
      mode,
      defaultOpenSubMenus,
    };
  }, [currentActive, handleClick, mode, defaultOpenSubMenus]);

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      const i = childElement.props.index || index.toString();

      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: i,
        });
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component");
      }
    })
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
});

Menu.displayName = 'Menu';

export default Menu;
