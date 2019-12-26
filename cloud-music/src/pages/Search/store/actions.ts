import {
  getHotKeyWordsRequest,
  getSuggestListRequest,
  getResultSongsListRequest,
} from '@/services';
import {
  AsyncAction,
  HotKeyWordItem,
  SongListItem,
} from '@/interfaces';
import {
  RootState,
} from '@/store';

import * as actionTypes from './action-types';
import {
  ChangeHotKeyWordsAction,
  ChangeSuggestListAction,
  ChangeResultSongsAction,
  ChangeEnterLoadingAction,
} from './types';

const changeHotKeyWords = (payload: HotKeyWordItem[]): ChangeHotKeyWordsAction => ({
  type: actionTypes.SET_HOT_KEYWRODS,
  payload,
});

const changeSuggestList = (payload: any): ChangeSuggestListAction => ({
  type: actionTypes.SET_SUGGEST_LIST,
  payload,
});

const changeResultSongs = (payload: SongListItem[]): ChangeResultSongsAction => ({
  type: actionTypes.SET_RESULT_SONGS_LIST,
  payload,
});

export const changeEnterLoading = (payload: boolean): ChangeEnterLoadingAction => ({
  type: actionTypes.SET_ENTER_LOADING,
  payload,
});

export const getHotKeyWords = (): AsyncAction<
  RootState,
  ChangeHotKeyWordsAction
> => {
  return (dispatch) => {
    getHotKeyWordsRequest().then(data => {
      dispatch(changeHotKeyWords(data));
    })
  }
};

export const getSuggestList = (query: string): AsyncAction<
  RootState,
  ChangeSuggestListAction | ChangeResultSongsAction | ChangeEnterLoadingAction
> => {
  return (dispatch) => {
    getSuggestListRequest(query).then(data => {
      dispatch(changeSuggestList(data));
    })
    getResultSongsListRequest(query).then(data => {
      dispatch(changeResultSongs(data));
      dispatch(changeEnterLoading(false));
    })
  }
};
