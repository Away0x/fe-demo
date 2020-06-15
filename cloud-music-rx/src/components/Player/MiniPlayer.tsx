import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import c from 'classnames';

import { getName } from '@/tools/utils';
import { ProgressCircle } from '@/components/Progress';

import s from './MiniPlayer.module.less';

type MiniPlayerProps = {
  song: any;
  playing: boolean; // 是否处于播放状态
  fullScreen: boolean; // 是否全屏
  percent: number;

  toggleFullScreen: (status: boolean) => void; // 切换全屏展示
  togglePlayList: (status: boolean) => void; // 显示播放列表
  clickPlaying: (e: React.MouseEvent<HTMLElement, MouseEvent>, status: boolean) => void; // 点击播放按钮
};

function MiniPlayer({
  song,
  playing,
  fullScreen,
  percent,

  toggleFullScreen,
  clickPlaying,
  togglePlayList,
}: MiniPlayerProps) {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleTogglePlayList = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    togglePlayList(true);
    event.stopPropagation();
  };

  const hideOrShowPlayer = (status: boolean) => {
    if (!playerRef.current) return;
    playerRef.current.style.display = status ? 'flex' : 'none';
  };

  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames="miniplayer"
      onEnter={() => {
        hideOrShowPlayer(true);
      }}
      onExited={() => {
        hideOrShowPlayer(false);
      }}>
      <div ref={playerRef} className={c('miniplayer-component', s.container)} onClick={() => toggleFullScreen(true)}>
        <div className={s.icon}>
          <div ref={wrapperRef} className={s.imgWrapper}>
            <img ref={imgRef} className={c('imgPlay', {imgPause: playing})}
              src={song.al.picUrl} width="40" height="40" alt="img" />
          </div>
        </div>
        <div className={s.text}>
          <h2 className={s.name}>{song.name}</h2>
          <p className={s.desc}>{getName(song.ar)}</p>
        </div>
        {/* progress */}
        <div className={s.control}>
          <ProgressCircle radius={32} percent={percent}>
            {playing
              ? <i className={c('iconfont', s.iconfont, s.iconMini)}
                  onClick={e => clickPlaying(e, false)}>&#xe650;</i>
              : <i className={c('iconfont', s.iconfont, s.iconMini, s.iconPlay)}
                  onClick={e => clickPlaying(e, true)}>&#xe61e;</i>
            }
          </ProgressCircle>
        </div>
        {/* list */}
        <div className={s.control} onClick={handleTogglePlayList}>
          <i className={`iconfont ${s.iconfont}`}>&#xe640;</i>
        </div>
      </div>
    </CSSTransition>
  );
}

export default React.memo(MiniPlayer);
