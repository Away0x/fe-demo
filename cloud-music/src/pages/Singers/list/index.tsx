import React from 'react';
import LazyLoad from 'react-lazyload';

import { SingerListItem } from '@/interfaces';

import {
  List,
  ListItem,
} from './index.style';

interface SingerListProps {
  list: SingerListItem[];
}

// 渲染函数，返回歌手列表
const SingerList: React.FC<SingerListProps> = ({ list }) => {
  return (
    <List>
      {
        list.map((item, index) => {
          return (
            <ListItem key={item.accountId + "" + index}>
              <div className="img_wrapper">
                <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music" />}>
                  <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          )
        })
      }
    </List>
  )
};

export default React.memo<typeof SingerList>(SingerList);
