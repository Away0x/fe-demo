import {
  HotKeyWordItem,
  SongListItem,
} from '@/interfaces';
import * as actionTypes from './action-types';

export interface SearchState {
  hotList: HotKeyWordItem[];
  suggestList: any;
  songsList: SongListItem[];
  enterLoading: boolean;
}

export interface ChangeHotKeyWordsAction {
  type: typeof actionTypes.SET_HOT_KEYWRODS;
  payload: HotKeyWordItem[];
}

export interface ChangeSuggestListAction {
  type: typeof actionTypes.SET_SUGGEST_LIST;
  payload: any;
}

export interface ChangeResultSongsAction {
  type: typeof actionTypes.SET_RESULT_SONGS_LIST;
  payload: SongListItem[];
}

export interface ChangeEnterLoadingAction {
  type: typeof actionTypes.SET_ENTER_LOADING;
  payload: boolean;
}

export type SearchActions = ChangeHotKeyWordsAction
  | ChangeSuggestListAction
  | ChangeResultSongsAction
  | ChangeEnterLoadingAction;
