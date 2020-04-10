import { PlayMode } from '@/constants';

import * as actionTypes from './action-types';
import {
  ChangeCurrentSongAction,
  ChangeFullScreenAction,
  ChangePlayingStateAction,
  ChangeSequecePlayListAction,
  ChangePlayListAction,
  ChangePlayModeAction,
  ChangeCurrentIndexAction,
  ChangeShowPlayListAction,
} from './types';

export const changeCurrentSong = (payload: object): ChangeCurrentSongAction => ({
  type: actionTypes.SET_CURRENT_SONG,
  payload,
});

export const changeFullScreen = (payload: boolean): ChangeFullScreenAction => ({
  type: actionTypes.SET_FULL_SCREEN,
  payload
});

export const changePlayingState = (payload: boolean): ChangePlayingStateAction => ({
  type: actionTypes.SET_PLAYING_STATE,
  payload
});

export const changeSequecePlayList = (payload: any[]): ChangeSequecePlayListAction => ({
  type: actionTypes.SET_SEQUECE_PLAYLIST,
  payload,
});

export const changePlayList = (payload: any[]): ChangePlayListAction => ({
  type: actionTypes.SET_PLAYLIST,
  payload,
});

export const changePlayMode = (payload: PlayMode): ChangePlayModeAction => ({
  type: actionTypes.SET_PLAY_MODE,
  payload,
});

export const changeCurrentIndex = (payload: number): ChangeCurrentIndexAction => ({
  type: actionTypes.SET_CURRENT_INDEX,
  payload,
});

export const changeShowPlayList = (payload: boolean): ChangeShowPlayListAction => ({
  type: actionTypes.SET_SHOW_PLAYLIST,
  payload,
});
