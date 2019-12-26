import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { PlayMode } from '@/constants';
import { RootState } from '@/store';
import {
  changePlayingState,
  changeFullScreen,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayMode,
  changePlayList,
} from './store/actions';

import MiniPlayer from './mini';
import NormalPlayer from './normal';

interface PlayerProps {
  fullScreen: boolean;
  playing: boolean;
  currentSong: object;
  showPlayList: boolean;
  mode: PlayMode;
  currentIndex: number;
  playList: any[];
  sequencePlayList: any[];

  togglePlayingDispatch: (s: boolean) => void;
  toggleFullScreenDispatch: (s: boolean) => void;
  togglePlayListDispatch: (s: boolean) => void;
  changeCurrentIndexDispatch: (n: number) => void;
  changeCurrentDispatch: (d: object) => void;
  changeModeDispatch: (m: PlayMode) => void;
  changePlayListDispatch: (l: any[]) => void;
}

const Player: React.FC<PlayerProps> = ({
  fullScreen,
  playing,
  currentSong,
  showPlayList,
  mode,
  currentIndex,
  playList,
  sequencePlayList,

  togglePlayingDispatch,
  toggleFullScreenDispatch,
  togglePlayListDispatch,
  changeCurrentIndexDispatch,
  changeCurrentDispatch,
  changeModeDispatch,
  changePlayListDispatch,
}) => {

  const currentSongMock = {
    al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
    name: "木偶人",
    ar: [{ name: "薛之谦" }]
  }

  return (
    <div>
      {/* <MiniPlayer song={currentSongMock} /> */}
      <NormalPlayer song={currentSongMock} />
    </div>
  );
};

export default React.memo(() => {
  const dispatch = useDispatch();

  const fullScreen = useSelector((s: RootState) => s.player.fullScreen);
  const playing = useSelector((s: RootState) => s.player.playing);
  const currentSong = useSelector((s: RootState) => s.player.currentSong);
  const showPlayList = useSelector((s: RootState) => s.player.showPlayList);
  const mode = useSelector((s: RootState) => s.player.mode);
  const currentIndex = useSelector((s: RootState) => s.player.currentIndex);
  const playList = useSelector((s: RootState) => s.player.playList);
  const sequencePlayList = useSelector((s: RootState) => s.player.sequencePlayList);

  const togglePlayingDispatch = useCallback((s: boolean) =>
    dispatch(changePlayingState(s)), [dispatch]);
  const toggleFullScreenDispatch = useCallback((s: boolean) =>
    dispatch(changeFullScreen(s)), [dispatch]);
  const togglePlayListDispatch = useCallback((s: boolean) =>
    dispatch(changeShowPlayList(s)), [dispatch]);
  const changeCurrentIndexDispatch = useCallback((n: number) =>
    dispatch(changeCurrentIndex(n)), [dispatch]);
  const changeCurrentDispatch = useCallback((d: object) =>
    dispatch(changeCurrentSong(d)), [dispatch]);
  const changeModeDispatch = useCallback((m: PlayMode) =>
    dispatch(changePlayMode(m)), [dispatch]);
  const changePlayListDispatch = useCallback((l: any[]) =>
    dispatch(changePlayList(l)), [dispatch]);

  return <Player
    fullScreen={fullScreen}
    playing={playing}
    currentSong={currentSong}
    showPlayList={showPlayList}
    mode={mode}
    currentIndex={currentIndex}
    playList={playList}
    sequencePlayList={sequencePlayList}
    togglePlayingDispatch={togglePlayingDispatch}
    toggleFullScreenDispatch={toggleFullScreenDispatch}
    togglePlayListDispatch={togglePlayListDispatch}
    changeCurrentIndexDispatch={changeCurrentIndexDispatch}
    changeCurrentDispatch={changeCurrentDispatch}
    changeModeDispatch={changeModeDispatch}
    changePlayListDispatch={changePlayListDispatch} />
});
