import * as actionTypes from './action-types';
import { RecommendListItem, BannerListItem } from '@/interfaces';

export interface RecommendState {
  bannerList: BannerListItem[];
  recommendList: RecommendListItem[];
  enterLoading: boolean;
}

export interface ChangeBannerListAction {
  type: typeof actionTypes.CHANGE_BANNER;
  payload: BannerListItem[];
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
