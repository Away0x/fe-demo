import { PlayMode } from '@/constants';

import * as actionTypes from './action-types';
import { PlayerState, PlayerActions } from './types';

const defaultState: PlayerState = {
  fullScreen: false, // 播放器是否为全屏模式
  playing: false,    // 当前歌曲是否播放
  sequencePlayList: [], // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList: [],
  mode: PlayMode.sequence,// 播放模式
  currentIndex: -1,// 当前歌曲在播放列表的索引位置
  showPlayList: false,// 是否展示播放列表
  currentSong: {}
};

export default (state = defaultState, action: PlayerActions): PlayerState => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG:
      return { ...state, currentSong: action.payload };
    case actionTypes.SET_FULL_SCREEN:
      return { ...state, fullScreen: action.payload };
    case actionTypes.SET_PLAYING_STATE:
      return { ...state, playing: action.payload };
    case actionTypes.SET_SEQUECE_PLAYLIST:
      return { ...state, sequencePlayList: action.payload };
    case actionTypes.SET_PLAYLIST:
      return { ...state, playList: action.payload };
    case actionTypes.SET_PLAY_MODE:
      return { ...state, mode: action.payload };
    case actionTypes.SET_CURRENT_INDEX:
      return { ...state, currentIndex: action.payload };
    case actionTypes.SET_SHOW_PLAYLIST:
      return { ...state, showPlayList: action.payload };
    default:
      return state;
  }
};
