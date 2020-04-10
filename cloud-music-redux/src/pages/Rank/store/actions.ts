import { RootState } from '@/store';
import * as actionTypes from './action-types';
import {
  getRankListRequest,
} from '@/services';
import {
  AsyncAction,
  RankListItem,
} from '@/interfaces';
import {
  RankActions,
  ChangeRankListAction,
  ChangeLoadingAction,
} from './types';

const changeRankList = (payload: RankListItem[]): ChangeRankListAction => ({
  type: actionTypes.CHANGE_RANK_LIST,
  payload,
});

const changeLoading = (payload: boolean): ChangeLoadingAction => ({
  type: actionTypes.CHANGE_LOADING,
  payload,
});

export const getRankList = (): AsyncAction<
  RootState,
  RankActions
> => {
  return (dispatch) => {
    getRankListRequest().then(data => {
      dispatch(changeRankList(data));
      dispatch(changeLoading(false));
    })
  }
}
