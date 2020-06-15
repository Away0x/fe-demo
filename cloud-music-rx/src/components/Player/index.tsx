import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

import { PlayMode, getPlayModeText } from '@/constants';
import { isEmptyObject } from '@/tools/utils';
import Toast, { ToastHandlers } from '@/components/Toast';
import { usePlayerState, playerStore } from '@/stores';
// import { getLyricRequest } from '@/services';

import MiniPlayer from './MiniPlayer';
import NormalPlayer from './NormalPlayer';

const currentSong = {
  al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
  name: "木偶人",
  ar: [{ name: "薛之谦" }]
}
const playList = [
  {
    ftype: 0,
    djId: 0,
    a: null,
    cd: '01',
    crbt: null,
    no: 1,
    st: 0,
    rt: '',
    cf: '',
    alia: [
      '手游《梦幻花园》苏州园林版推广曲'
    ],
    rtUrls: [],
    fee: 0,
    s_id: 0,
    copyright: 0,
    h: {
      br: 320000,
      fid: 0,
      size: 9400365,
      vd: -45814
    },
    mv: 0,
    al: {
      id: 84991301,
      name: '拾梦纪',
      picUrl: 'http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg',
      tns: [],
      pic_str: '109951164627180052',
      pic: 109951164627180050
    },
    name: '拾梦纪',
    l: {
      br: 128000,
      fid: 0,
      size: 3760173,
      vd: -41672
    },
    rtype: 0,
    m: {
      br: 192000,
      fid: 0,
      size: 5640237,
      vd: -43277
    },
    cp: 1416668,
    mark: 0,
    rtUrl: null,
    mst: 9,
    dt: 234947,
    ar: [
      {
        id: 12084589,
        name: '妖扬',
        tns: [],
        alias: []
      },
      {
        id: 12578371,
        name: '金天',
        tns: [],
        alias: []
      }
    ],
    pop: 5,
    pst: 0,
    t: 0,
    v: 3,
    id: 1416767593,
    publishTime: 0,
    rurl: null
  }
];

type PlayerProps = {
  mode: PlayMode; // 播放模式
  fullScreen: boolean; // 播放器是否为全屏模式
  playing: boolean; // 当前歌曲是否播放
  currentIndex: number; // 当前歌曲在播放列表的索引位置
  showPlayList: boolean; // 是否展示播放列表
  sequencePlayList: any[]; // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList: any[];
  currentSong: null | any;
  speed: number; // 播放速度
};

function Player({
  fullScreen,
  playing,
  currentSong,
  showPlayList,
  mode,
  speed,
  currentIndex,
  playList,
  sequencePlayList,
}: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const toastRef = useRef<ToastHandlers | null>(null);

  const songReadyRef = useRef(true);
  const currentLyric = useRef<any>(); //TODO: 这个做啥的

  // 前一首歌
  const [preSong, setPreSong] = useState<any | null>(null);
  // 目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  // 歌曲总时长
  const [duration, setDuration] = useState(500);
  //TODO: 这个做啥的
  const [currentPlayingLyric, setPlayingLyric] = useState('');
  const currentLineNum = useRef(0);

  // 歌曲播放进度
  const percent = useMemo(() => {
    const cur = currentTime / duration;
    return isNaN(cur) ? 0 : cur;
  }, [currentTime, duration]);
  // 播放 mode text
  const modeText = useMemo(() => {
    return getPlayModeText(mode);
  }, [mode]);

  /** 切换当前歌曲 */
  const changeCurrentSong = useCallback((song: any) => {
    playerStore.changeCurrentSong(song);
  }, []);

  /** 切换播放暂停 */
  const togglePlaying = useCallback((status: boolean) => {
    playerStore.togglePlaying(status);
  }, []);

  /** 切换全屏播放器 */
  const toggleFullScreen = useCallback((status: boolean) => {
    playerStore.toggleFullScreen(status);
  }, []);

  /** 歌曲进度 change */
  const onProgressChange = useCallback((curPercent: number) => {
    if (!audioRef.current) return;
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!playing) {
      togglePlaying(true);
    }
    if (currentLyric.current) {
      currentLyric.current.seek(newTime * 1000);
    }
  }, [duration, playing]);

  /** 点击播放/暂停按钮 */
  const clickPlaying = useCallback((e: React.MouseEvent, status: boolean) => {
    e.stopPropagation();
    togglePlaying(status);
    if (currentLyric.current) {
      currentLyric.current.togglePlay(currentTime * 1000);
    }
  }, [togglePlaying, currentTime]);

  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === (preSong || {}).id ||
      !songReadyRef.current ||
      !audioRef.current
    ) return;
    const curSong = playList[currentIndex];
    if (!curSong) return;
    
    songReadyRef.current = false;

    changeCurrentSong(curSong);
    setPreSong(curSong)
    setPlayingLyric('');

    audioRef.current.src = '';
    audioRef.current.autoplay = true;
    audioRef.current.playbackRate = speed;

    togglePlaying(true);
    // getLyric(curSong.id);
    setCurrentTime(0);
    setDuration((curSong.dt / 1000) | 0);
  }, [
    currentIndex, playList, speed,
    togglePlaying,
  ]);
  
  // TODO: ???
  const handleLyric = useCallback((data: {
    lineNum: number;
    txt: string;
  }) => {
    if (!currentLyric.current) return;
    currentLineNum.current = data.lineNum;
    setPlayingLyric(data.txt);
  }, []);

  // TODO: ???
  const getLyric = useCallback(() => {
    let lyric = '';
    if (currentLyric.current) {
      currentLyric.current.stop();
    }

    // 避免 songReady 恒为false的情况
    setTimeout(() => {
      songReadyRef.current = true;
    }, 3000);


  }, []);

  // 控制播放暂停
  useEffect(() => {
    if (!audioRef.current) return;
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  // TODO: ？？？
  useEffect(() => {
    if (!fullScreen) return;
    if (currentLyric.current && currentLyric.current.lines.length) {
      handleLyric({
        lineNum: currentLineNum.current,
        txt: currentLyric.current.lines[currentLineNum.current].txt
      });
    }
  }, [fullScreen]);

  return (
    <div>
      {isEmptyObject(currentSong) ? null :
        <MiniPlayer
          song={currentSong}
          fullScreen={fullScreen}
          toggleFullScreen={toggleFullScreen}
          percent={percent}
          playing={playing}
          togglePlayList={() => { }}
          clickPlaying={clickPlaying} />
      }

      {/* {isEmptyObject(currentSong) ? null :
        <NormalPlayer
          song={currentSong}
          percent={percent}
          duration={duration}
          currentTime={currentTime}
          fullScreen={fullScreen}
          toggleFullScreen={toggleFullScreen}
          onProgressChange={onProgressChange}
          clickPlaying={clickPlaying} />
      } */}

      {/* <audio
        ref={audioRef}
        onTimeUpdate={updateTime}
        onEnded={handleEnd}
        onError={handleError} /> */}

      <Toast text={''} ref={toastRef} />
    </div>
  );
}

const PlayerM = React.memo(Player);

export default React.memo(() => {
  const {
    fullScreen,
    playing,
    currentSong,
    showPlayList,
    mode,
    speed,
    currentIndex,
    playList,
    sequencePlayList,
  } = usePlayerState();

  return <PlayerM
    fullScreen={fullScreen}
    playing={playing}
    currentSong={currentSong}
    showPlayList={showPlayList}
    mode={mode}
    speed={speed}
    currentIndex={currentIndex}
    playList={playList}
    sequencePlayList={sequencePlayList} />;
});
