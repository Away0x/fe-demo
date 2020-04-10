import React from 'react';
import LazyLoad from 'react-lazyload';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { SingerListItem } from '@/interfaces';

import {
  List,
  ListItem,
} from './list.style';

interface SingerListProps {
  list: SingerListItem[];
}

// 渲染函数，返回歌手列表
const SingerList: React.FC<SingerListProps & RouteComponentProps> = ({
  list,

  history,
}) => {
  const enterDetail = (id: number)  => {
    history.push (`/singers/${id}`);
  };

  return (
    <List>
      {
        list.map((item, index) => {
          return (
            <ListItem key={item.accountId + "" + index} onClick={() => enterDetail(item.id)}>
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

export default React.memo<SingerListProps>(withRouter(SingerList) as any);
