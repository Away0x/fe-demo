import React from 'react';

import { HotSongInfo } from '@/interfaces';
import { getName } from '@/utils';
import {
  SongList,
  SongItem,
} from './index.style';

interface SingerListWrapperProps {
  songs: HotSongInfo[];
  showCollect: boolean;
  collectCount?: number;
  showBackground?: boolean;
}

const SingerListWrapper = React.forwardRef<HTMLDivElement, SingerListWrapperProps>(({
  songs,
  showCollect,
  collectCount = 0,
  showBackground = false,
}, ref) => {
  const totalCount = songs.length;
  const selectItem = (e: HotSongInfo, index: number) => {
    console.log(index);
  }
  const songList = (list: HotSongInfo[]) => {
    let res = [];
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      res.push(
        <li key={item.id} onClick={(e) => selectItem(e, i)}>
          <span className="index">{i + 1}</span>
          <div className="info">
            <span>{item.name}</span>
            <span>
              {item.ar ? getName(item.ar) : getName(item.artists)} - {item.al ? item.al.name : item.album.name}
            </span>
          </div>
        </li>
      )
    }
    return res;
  };
  const collect = (count: number) => {
    return (
      <div className="add_list">
        <i className="iconfont">&#xe62d;</i>
        <span>收藏({Math.floor(count / 1000) / 10}万)</span>
      </div>
      // <div className="isCollected">
      //   <span>已收藏({Math.floor(count/1000)/10}万)</span>
      // </div>
    )
  };

  return (
    <SongList ref={ref} showBackground={showBackground}>
      <div className="first_line">
        <div className="play_all" onClick={(e) => selectItem(e, 0)}>
          <i className="iconfont">&#xe6e3;</i>
          <span>播放全部 <span className="sum">(共{totalCount}首)</span></span>
        </div>
        {showCollect ? collect(collectCount) : null}
      </div>
      <SongItem>
        {songList(songs)}
      </SongItem>
    </SongList>
  )
});

export default React.memo<typeof SingerListWrapper>(SingerListWrapper);
