import React, { useState, useCallback, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router-dom';

import { HEADER_HEIGHT } from '@/constants';
import { Loading } from '@/components/Loading';
import NavHeader from '@/components/NavHeader';
import Scroll, { ScrollerHandlers } from '@/components/Scroll';
import SongList from '@/components/SongList';

import s from './Singer.module.less';

const OFFSET = 5;

type SingerProps = {
  artist: Resp.ArtistInfo | null,
  songsOfArtist: Resp.SongListItem[];
  loading: boolean;
};

function Singer({
  artist,
  songsOfArtist,
  loading,
}: SingerProps) {
  const history = useHistory();

  const initialHeightRef = useRef(0);
  const navHeaderRef = useRef<HTMLDivElement | null>(null);
  const collectBtnRef = useRef<HTMLDivElement | null>(null);
  const imgWrapperRef = useRef<HTMLDivElement | null>(null);
  const songListRef = useRef<HTMLDivElement | null>(null);
  const songScrollRef = useRef<ScrollerHandlers | null>(null);
  const bgLayerRef = useRef<HTMLDivElement | null>(null);

  const [showStatus, setShowStatus] = useState(true);

  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = useCallback((pos: any) => {
    const height = initialHeightRef.current;
    const newY = pos.y;
    const imageDOM = imgWrapperRef.current;
    const buttonDOM = collectBtnRef.current;
    const headerDOM = navHeaderRef.current;
    const layerDOM = bgLayerRef.current;

    if (!imageDOM || !buttonDOM || !headerDOM || !layerDOM) return;

    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;
    // 指的是滑动距离占图片高度的百分比
    const percent = Math.abs(newY / height);
    // 说明: 在歌手页的布局中，歌单列表其实是没有自己的背景的，layerDOM 其实是起一个遮罩的作用，给歌单内容提供白色背景
    // 因此在处理的过程中，随着内容的滚动，遮罩也跟着移动
    if (newY > 0) {
      // 处理往下拉的情况,效果：图片放大，按钮跟着偏移
      imageDOM.style.transform = `scale(${1 + percent})`;
      buttonDOM.style.transform = `translate3d(0, ${newY}px, 0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
    } else if (newY >= minScrollY) {
      // 往上滑动，但是还没超过Header部分
      layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
      layerDOM.style.zIndex = `1`;
      imageDOM.style.paddingTop = "75%";
      imageDOM.style.height = `0`;
      imageDOM.style.zIndex = `-1`;
      buttonDOM.style.transform = `translate3d(0, ${newY}px, 0)`;
      buttonDOM.style.opacity = `${1 - percent * 2}`;
    } else if (newY < minScrollY) {
      // 往上滑动，但是超过Header部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerDOM.style.zIndex = `1`;
      // 防止溢出的歌单内容遮住Header
      headerDOM.style.zIndex = `100`;
      // 此时图片高度与Header一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      imageDOM.style.paddingTop = `0`;
      imageDOM.style.zIndex = `99`;
    }
  }, []);
  
  useEffect(() => {
    if (!imgWrapperRef.current || !songListRef.current || !bgLayerRef.current || !songScrollRef.current) return;
    const h = imgWrapperRef.current.offsetHeight;
    initialHeightRef.current = h;
    songListRef.current.style.top = `${h - OFFSET}px`;
    //把遮罩先放在下面，以裹住歌曲列表
    bgLayerRef.current.style.top = `${h - OFFSET}px`;
    songScrollRef.current.refresh();
  }, []);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={history.goBack}>
      <div className={s.container}>
        {artist ? (
          <NavHeader ref={navHeaderRef} title={artist.name} handleClick={setShowStatusFalse} />
        ) : null}

        {/* 顶部背景图 */}
        <div ref={imgWrapperRef} className={s.imgWrapper}
          style={{ backgroundImage: artist ? `url(${artist.picUrl})` : ''}}>
          <div className={s.imgFilter}></div>
        </div>

        {/* 收藏按钮 */}
        <div className={s.collectBtn} ref={collectBtnRef}>
          <i className="iconfont">&#xe62d;</i>
          <span>收藏</span>
        </div>

        {/* 遮罩 */}
        <div ref={bgLayerRef} className={s.bgLayer}></div>

        {/* list */}
        <div ref={songListRef} className={s.listWrapper} style={{bottom: false ? '60px' : 0}}>
          <Scroll
            ref={songScrollRef}
            onScroll={handleScroll}>
            <SongList
              songs={songsOfArtist}
              showCollect={false} />
          </Scroll>
        </div>

        {loading ? <div className="g-enter-loading"><Loading /></div> : null}
      </div>
    </CSSTransition>
  );
}

export default React.memo(Singer);
