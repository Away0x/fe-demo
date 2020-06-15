import React from 'react';
import c from 'classnames';
import LazyLoad from 'react-lazyload';

import { globalStore } from '@/stores';
import { getCount } from '@/tools/utils';

import s from './RecommendList.module.less';

export const LazyLoadContentImg = (props: { src?: string; }) => {
  const src = props.src ? `${props.src}?param=300x300` : require('./music.png');

  return (
    <img className={s.playImg} width="100%" height="100%" src={src} alt="music" />
  );
};

type RecommendListProps = {
  recommendList: Resp.RecommendListItem[];
};

function RecommendList({
  recommendList,
}: RecommendListProps) {
  const enterDetail = (id: number) => {
    globalStore.redirect({path: `/recommend/${id}`});
  };

  return (
    <div className={s.listWrapper}>
      <h1 className={s.listTitle}> 推荐歌单 </h1>
      <div className={s.list}>
        {
          recommendList.map((item, index) => {
            return (
              <div className={s.listItem} key={item.id + index}
                onClick={() => enterDetail(item.id)}>
                <div className={s.imgWrapper}>
                  <div className={s.decorate}></div>
                  <LazyLoad placeholder={<LazyLoadContentImg />}>
                    <LazyLoadContentImg src={item.picUrl} />
                  </LazyLoad>
                  <div className={s.playCount}>
                    <i className={c('iconfont', s.play)}>&#xe885;</i>
                    <span className="count">{getCount(item.playCount)}</span>
                  </div>
                </div>
                <div className={s.desc}>{item.name}</div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default React.memo(RecommendList);
