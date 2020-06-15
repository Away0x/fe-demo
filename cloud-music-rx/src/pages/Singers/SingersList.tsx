import React from 'react';
import LazyLoad from 'react-lazyload';

import { globalStore } from '@/stores';

import s from './SingersList.module.less';

const LazyLoadContentImg = (props: { src?: string; }) => {
  const src = props.src ? `${props.src}?param=300x300` : require('./singer.png');

  return (
    <img className={s.img} width="100%" height="100%" src={src} alt="singer" />
  );
};

interface SingerListProps {
  title?: string;
  list?: Resp.SingerListItem[];
}

function SingersList({
  title,
  list,
}: SingerListProps) {
  const enterDetail = (id: number) => {
    globalStore.redirect({path: `/singers/${id}`});
  };

  if (!list || !list.length) return null;
  return (
    <div className={s.list}>
      {title ?
        <h1>{title}</h1>
      : null}
      {
        list.map((item, index) => {
          return (
            <div className={s.listItem} key={item.accountId + '-' + index} onClick={() => enterDetail(item.id)}>
              <div className={s.imgWrapper}>
                <LazyLoad placeholder={<LazyLoadContentImg />}>
                  <LazyLoadContentImg src={item.picUrl} />
                </LazyLoad>
              </div>
              <span className={s.name}>{item.name}</span>
            </div>
          )
        })
      }
    </div>
  )
}

export default React.memo(SingersList);
