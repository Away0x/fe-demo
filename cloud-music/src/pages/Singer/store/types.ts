import { ArtistInfo, HotSongInfo } from '@/interfaces';
import * as actionTypes from './action-types';

export interface SingerState {
  artist: ArtistInfo | null,
  songsOfArtist: HotSongInfo[];
  loading: boolean;
}

export interface ChangeArtistAction {
  type: typeof actionTypes.CHANGE_ARTIST;
  payload: ArtistInfo;
}

export interface ChangeSongsAction {
  type: typeof actionTypes.CHANGE_SONGS_OF_ARTIST;
  payload: HotSongInfo[];
}

export interface ChangeEnterLoading {
  type: typeof actionTypes.CHANGE_ENTER_LOADING;
  payload: boolean;
}

export type SingerActions = ChangeArtistAction
  | ChangeSongsAction
  | ChangeEnterLoading;
