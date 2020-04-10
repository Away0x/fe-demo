import React, { useRef, useEffect } from 'react';

import {
  List,
  ListItem,
} from './index.style';
import Scroll from '@/components/Scroll';
import { HorizenItem } from '@/interfaces';

interface HorizenProps {
  list?: HorizenItem[];
  oldVal?: string;
  title?: string;
  handleClick?: (t: HorizenItem) => void;
}

const Horizen: React.FC<HorizenProps> = ({
  list = [],
  oldVal = '',
  title = '',
  handleClick,
}) => {
  const Category = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let categoryDOM = Category.current;
    if (!categoryDOM) return;
    let tagElems = categoryDOM.querySelectorAll("span");
    let totalWidth = 0;
    Array.from(tagElems).forEach(ele => {
      totalWidth += ele.offsetWidth;
    });
    categoryDOM.style.width = `${totalWidth}px`;
  }, []);

  return (
    <Scroll direction={"horizental"}>
      <div ref={Category}>
        <List>
          <span>{title}</span>
          {
            list.map((item) => {
              return (
                <ListItem
                  key={item.key}
                  className={`${oldVal === item.key ? 'selected' : ''}`}
                  onClick={() => handleClick && handleClick(item)}>
                  {item.name}
                </ListItem>
              )
            })
          }
        </List>
      </div>
    </Scroll>
  );
};

export default React.memo<typeof Horizen>(Horizen);
