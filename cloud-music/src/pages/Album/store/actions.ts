import { AsyncAction, AlbumListItem } from '@/interfaces';
import { RootState } from '@/store';
import { getAlbumDetailRequest } from '@/services';

import * as actionTypes from './action-types';
import {
  ChangeCurrentAlbumAction,
  ChangeEnterLoadingAction,
} from './types';

const changeCurrentAlbum = (payload: AlbumListItem): ChangeCurrentAlbumAction => ({
  type: actionTypes.CHANGE_CURRENT_ALBUM,
  payload,
});

export const changeEnterLoading = (payload: boolean): ChangeEnterLoadingAction => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  payload
});

export const getAlbumList = (id: number): AsyncAction<
  RootState,
  ChangeCurrentAlbumAction | ChangeEnterLoadingAction
> => {
  return (dispatch) => {
    getAlbumDetailRequest(id).then(data => {
      if (!data) throw new Error('getAlbumDetailRequest data is null');

      dispatch(changeCurrentAlbum(data));
      dispatch(changeEnterLoading(false));
    }).catch(() => {
      console.log("获取album数据失败!")
    });
  }
};
