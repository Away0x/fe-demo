import { AlbumListItem } from '@/interfaces';

import * as actionTypes from './action-types';

export interface AlbumState {
  currentAlbum: AlbumListItem | null;
  enterLoading: boolean;
}

export interface ChangeCurrentAlbumAction {
  type: typeof actionTypes.CHANGE_CURRENT_ALBUM;
  payload: AlbumListItem;
}

export interface ChangeEnterLoadingAction {
  type: typeof actionTypes.CHANGE_ENTER_LOADING;
  payload: boolean;
}

export type AlbumActions = ChangeCurrentAlbumAction
  | ChangeEnterLoadingAction;
