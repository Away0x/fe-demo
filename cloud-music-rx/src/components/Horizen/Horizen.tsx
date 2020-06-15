import React, { memo, useRef, useEffect } from 'react';
import c from 'classnames';

import Scroll from '@/components/Scroll';

import s from './Horizen.module.less';

interface HorizenProps {
  list?: Resp.HorizenItem[];
  oldVal?: string;
  title?: string;
  handleClick?: (t: Resp.HorizenItem) => void;
}

const Horizen = memo<HorizenProps>(({
  list = [],
  oldVal = '',
  title = '',
  handleClick,
}) => {
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let categoryDOM = categoryRef.current;
    if (!categoryDOM) return;

    let tagElems = categoryDOM.querySelectorAll('span');
    let totalWidth = 0;
    Array.from(tagElems).forEach(ele => {
      totalWidth += ele.offsetWidth;
    });
    categoryDOM.style.width = `${totalWidth}px`;
  }, [list]);

  return (
    <Scroll direction={"horizental"}>
      <div ref={categoryRef}>
        <div className={s.list}>
          <span className={s.listTitle}>{title}</span>
          {
            list.map((item) => {
              return (
                <span className={c(s.listItem, {[s.itemSelect]: oldVal === item.key})}
                  key={item.key}
                  onClick={() => handleClick && handleClick(item)}>
                  {item.name}
                </span>
              )
            })
          }
        </div>
      </div>
    </Scroll>
  );
});

export default Horizen;
