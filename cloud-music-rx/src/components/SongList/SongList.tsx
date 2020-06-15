import React from 'react';

import { getName, getCount } from '@/tools/utils';

import s from './SongList.module.less';

interface SingerListProps {
  songs: Resp.SongListItem[];
  showCollect?: boolean;
  collectCount?: number;
  showBackground?: boolean;
}

const SingerList = React.forwardRef<HTMLDivElement, SingerListProps>(({
  songs,
  showCollect = true,
  collectCount = 0,
  showBackground = false,
}, ref) => {
  const totalCount = songs.length;

  const selectItem = (e: any, index: number) => {
    console.log(index);
  }

  const songList = (list: Resp.SongListItem[]) => {
    let res = [];
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      res.push(
        <li key={item.id} onClick={(e) => selectItem(e, i)}>
          <span className={s.itemIndex}>{i + 1}</span>
          <div className={s.itemInfo}>
            <span>{item.name}</span>
            <span>
              {item.ar ? getName(item.ar) : getName(item.artists || [])} - {item.al ? item.al.name : item.album?.name}
            </span>
          </div>
        </li>
      )
    }
    return res;
  };

  const collect = () => {
    return (
      <div className={s.addList}>
        <i className="iconfont">&#xe62d;</i>
        <span>收藏({getCount(collectCount)})</span>
      </div>
      // <div className="isCollected">
      //   <span>已收藏({Math.floor(count/1000)/10}万)</span>
      // </div>
    )
  };

  const listBg = showBackground ? {} : { background: '' };

  return (
    <div className={s.list} ref={ref} style={listBg}>
      <div className={s.firstLine}>
        <div className={s.playAll} onClick={(e) => selectItem(e, 0)}>
          <i className="iconfont">&#xe6e3;</i>
          <span>播放全部 <span className={s.sum}>(共{totalCount}首)</span></span>
        </div>
        {showCollect ? collect() : null}
      </div>
      <ul className={s.itemWrapper}>
        {songList(songs)}
      </ul>
    </div>
  )
});

export default React.memo(SingerList);
