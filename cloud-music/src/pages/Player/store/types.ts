import { PlayMode } from '@/constants';

import * as actionTypes from './action-types';

export interface PlayerState {
  fullScreen: boolean; // 播放器是否为全屏模式
  playing: boolean;    // 当前歌曲是否播放
  sequencePlayList: any[]; // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList: any[];
  mode: PlayMode; // 播放模式
  currentIndex: number; // 当前歌曲在播放列表的索引位置
  showPlayList: boolean; // 是否展示播放列表
  currentSong: object;
}

export interface ChangeCurrentSongAction {
  type: typeof actionTypes.SET_CURRENT_SONG;
  payload: object;
}

export interface ChangeFullScreenAction {
  type: typeof actionTypes.SET_FULL_SCREEN;
  payload: boolean;
}

export interface ChangePlayingStateAction {
  type: typeof actionTypes.SET_PLAYING_STATE;
  payload: boolean;
}

export interface ChangeSequecePlayListAction {
  type: typeof actionTypes.SET_SEQUECE_PLAYLIST;
  payload: any[];
}

export interface ChangePlayListAction {
  type: typeof actionTypes.SET_PLAYLIST;
  payload: any[];
}

export interface ChangePlayModeAction {
  type: typeof actionTypes.SET_PLAY_MODE;
  payload: PlayMode;
}

export interface ChangeCurrentIndexAction {
  type: typeof actionTypes.SET_CURRENT_INDEX;
  payload: number;
}

export interface ChangeShowPlayListAction {
  type: typeof actionTypes.SET_SHOW_PLAYLIST;
  payload: boolean;
}

export type PlayerActions = ChangeCurrentSongAction
  | ChangeFullScreenAction
  | ChangePlayingStateAction
  | ChangeSequecePlayListAction
  | ChangePlayListAction
  | ChangePlayModeAction
  | ChangeCurrentIndexAction
  | ChangeShowPlayListAction;
