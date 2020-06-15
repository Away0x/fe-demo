import React from 'react';
import c from 'classnames';

import Marquee from '@/components/Marquee';

import s from './NavHeader.module.less';

type NavHeaderProps = {
  title?: string;
  isMarquee?: boolean; // 是否为走马灯
  handleClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const NavHeader = React.forwardRef<HTMLDivElement, NavHeaderProps>(({
  title = '标题',
  isMarquee = false,
  handleClick = (_) => {},
}, ref) => {
  return (
    <div className={s.container} ref={ref}>
      <i className={c('iconfont', s.back)} onClick={handleClick}>&#xe655;</i>
      {
        isMarquee ? <h1><Marquee text={title} /></h1> : <h1>{title}</h1>
      }
    </div>
  );
});

export default React.memo(NavHeader);
