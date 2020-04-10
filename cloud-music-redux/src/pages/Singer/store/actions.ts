import * as actionTypes from './action-types';
import {
  ChangeArtistAction,
  ChangeSongsAction,
  ChangeEnterLoading,
} from './types';

import {
  AsyncAction,
  ArtistInfo,
  HotSongInfo,
} from '@/interfaces';
import { RootState } from '@/store';
import { getSingerInfoRequest } from '@/services';

const changeArtist = (payload: ArtistInfo): ChangeArtistAction => ({
  type: actionTypes.CHANGE_ARTIST,
  payload,
});

const changeSongs = (payload: HotSongInfo[]): ChangeSongsAction => ({
  type: actionTypes.CHANGE_SONGS_OF_ARTIST,
  payload,
});

export const changeEnterLoading = (payload: boolean): ChangeEnterLoading => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  payload,
})

export const getSingerInfo = (id: number): AsyncAction<
  RootState,
  ChangeArtistAction | ChangeSongsAction | ChangeEnterLoading
> => {
  return (dispatch) => {
    getSingerInfoRequest(id).then((data) => {
      if (!data) {
        dispatch(changeEnterLoading(false));
        return;
      }
      dispatch(changeArtist(data.artist));
      dispatch(changeSongs(data.hotSongs));
      dispatch(changeEnterLoading(false));
    })
  }
}
