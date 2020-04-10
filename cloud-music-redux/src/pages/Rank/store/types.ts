import * as actionTypes from './action-types';
import { RankListItem } from '@/interfaces';

export interface RankState {
  rankList: RankListItem[];
  loading: boolean;
}

export interface ChangeRankListAction {
  type: typeof actionTypes.CHANGE_RANK_LIST;
  payload: RankListItem[];
}

export interface ChangeLoadingAction {
  type: typeof actionTypes.CHANGE_LOADING;
  payload: boolean;
}

export type RankActions = ChangeRankListAction
  | ChangeLoadingAction;
