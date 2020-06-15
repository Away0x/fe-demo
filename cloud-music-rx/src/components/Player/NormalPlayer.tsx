import React, { useRef, useState } from 'react';
import c from 'classnames';
import { CSSTransition } from 'react-transition-group';
import animations from 'create-keyframe-animation';

import { getName } from '@/tools/utils';
import { prefixStyle } from '@/tools/dom';
import { formatPlayTime } from '@/tools/date';
import { PlayMode } from '@/constants';

import { ProgressBar } from '@/components/Progress';

import s from './NormalPlayer.module.less';

const getPosAndScale = () => {
  const targetWidth = 40;
  const paddingLeft = 40;
  const paddingBottom = 30;
  const paddingTop = 80;
  const width = window.innerWidth * 0.8;
  const scale = targetWidth / width;
  // 两个圆心的横坐标距离和纵坐标距离
  const x = -(window.innerWidth / 2 - paddingLeft);
  const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
  return {
    x,
    y,
    scale
  };
};

const transform: any = prefixStyle('transform');

type NormalPlayerProps = {
  song: any;
  fullScreen: boolean;
  percent: number;
  currentTime: number;
  duration: number;
  mode: PlayMode;
  playing: boolean;
  currentLineNum: number;
  

  onProgressChange: (percent: number) => void; // 进度
  toggleFullScreen: (status: boolean) => void; // 切换全屏展示
  clickPlaying: (e: React.MouseEvent<HTMLElement, MouseEvent>, status: boolean) => void; // 点击播放按钮
};

function NormalPlayer({
  song,
  fullScreen,
  percent,
  currentTime,
  duration,

  onProgressChange,
  toggleFullScreen,
  clickPlaying,
}: NormalPlayerProps) {
  const normalPlayerRef = useRef<HTMLDivElement | null>(null);
  const cdWrapperRef = useRef<HTMLDivElement | null>(null);
  // const lyricScrollRef = useRef();
  // const lyricLineRefs = useRef([]);

  const [currentState, setCurrentState] = useState<'' | 'lyric'>('');


  const enter = () => {
    if (!normalPlayerRef.current) return;
    normalPlayerRef.current.style.display = 'block';
    const { x, y, scale } = getPosAndScale();
    let animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`
      }
    };
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 400,
        easing: 'linear'
      }
    });
    animations.runAnimation(cdWrapperRef.current, 'move');
  };

  const afterEnter = () => {
    if (!cdWrapperRef.current) return;
    animations.unregisterAnimation('move');
    cdWrapperRef.current.style.animation = '';
  };

  const leave = () => {
    if (!cdWrapperRef.current) return;
    cdWrapperRef.current.style.transition = 'all 0.4s';
    const { x, y, scale } = getPosAndScale();
    cdWrapperRef.current.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  };

  const afterLeave = () => {
    if (!cdWrapperRef.current || !normalPlayerRef.current) return;
    cdWrapperRef.current.style.transition = '';
    cdWrapperRef.current.style[transform] = '';
    // 一定要注意现在要把 normalPlayer 这个 DOM 给隐藏掉，因为 CSSTransition 的工作只是把动画执行一遍 
    // 不置为 none 现在全屏播放器页面还是存在
    normalPlayerRef.current.style.display = 'none';
    setCurrentState('');
  };

  const toggleCurrentState = () => {
    let nextState: 'lyric' | '' = (currentState !== 'lyric') ? 'lyric' : '';
    setCurrentState(nextState);
  };

  return (
    <CSSTransition
      classNames="normalplayer"
      in={fullScreen}
      timeout={400}
      mountOnEnter
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}>
      <div ref={normalPlayerRef} className={c('normalplayer-component', s.container)}>
        <div className={s.background}>
          <img src={song.al.picUrl + "?param=300x300"} width="100%" height="100%" alt="歌曲图片" />
        </div>
        <div className={c(s.background, s.layer)}></div>
        <div className={c('top', s.top)}>
          <div className={s.back} onClick={() => toggleFullScreen(false)}>
            <i className={c('iconfont', 'icon-back', s.iconfont)}>&#xe662;</i>
          </div>
          <h1 className={s.title}>{song.name}</h1>
          <h1 className={s.subtitle}>{getName(song.ar)}</h1>
        </div>

        <div ref={cdWrapperRef} className={s.middle}>
          <div className={s.cdWrapper}>
            <div className={s.cd}>
              <img className={c(s.cdImage, 'play')} src={song.al.picUrl + "?param=400x400"} alt="" />
            </div>
          </div>
        </div>

        <div className={c('bottom', s.bottom)}>

          <div className={s.progressWrapper}>
            <span className={c(s.progressTime, s.progressTimeL)}>{formatPlayTime(currentTime)}</span>
            <div className={s.progressBarWrapper}>
              <ProgressBar percent={percent} percentChange={onProgressChange} />
            </div>
            <div className={c(s.progressTime, s.progressTimeR)}>{formatPlayTime(duration)}</div>
          </div>

          <div className={s.operators}>
            <div className={c(s.operatorsIcon, s.operatorsIconLeft)}>
              <i className="iconfont">&#xe625;</i>
            </div>
            <div className={c(s.operatorsIcon, s.operatorsIconLeft)}>
              <i className="iconfont">&#xe6e1;</i>
            </div>
            <div className={c(s.operatorsIcon, s.operatorsIconCenter)}>
              <i className="iconfont">&#xe723;</i>
            </div>
            <div className={c(s.operatorsIcon, s.operatorsIconRight)}>
              <i className="iconfont">&#xe718;</i>
            </div>
            <div className={c(s.operatorsIcon, s.operatorsIconRight)}>
              <i className="iconfont">&#xe640;</i>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default React.memo(NormalPlayer);
