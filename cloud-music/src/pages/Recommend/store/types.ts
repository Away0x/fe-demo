import * as actionTypes from './action-types';
import { RecommendListItem } from '@/interfaces';

export interface RecommendState {
  bannerList: any[];
  recommendList: RecommendListItem[];
  enterLoading: boolean;
}

export interface ChangeBannerListAction {
  type: typeof actionTypes.CHANGE_BANNER;
  payload: any[];
}

export interface ChangeRecommendListAction {
  type: typeof actionTypes.CHANGE_RECOMMEND_LIST;
  payload: RecommendListItem[];
}

export interface ChangeEnterLoadingAction {
  type: typeof actionTypes.CHANGE_ENTER_LOADING;
  payload: boolean;
}

export type RecommendActions = ChangeBannerListAction
  | ChangeRecommendListAction
  | ChangeEnterLoadingAction;
