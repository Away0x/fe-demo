import { Dispatch } from 'redux';

import {
  BannerListItem,
  RecommendListItem,
} from '@/interfaces'
import * as actionTypes from './action-types';
import {
  ChangeBannerListAction,
  ChangeRecommendListAction,
  ChangeEnterLoadingAction,
} from './types';
import { getBannerRequest, getRecommendListRequest } from '@/services';

export const changeBannerList = (payload: any[]): ChangeBannerListAction => ({
  type: actionTypes.CHANGE_BANNER,
  payload,
});

export const changeRecommendList = (payload: RecommendListItem[]): ChangeRecommendListAction => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  payload,
});

export const changeEnterLoading = (payload: boolean): ChangeEnterLoadingAction => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  payload,
});

export const getBannerList = () => {
  return (dispatch: Dispatch<ChangeBannerListAction>) => {
    getBannerRequest().then((data: BannerListItem[]) => {
      dispatch(changeBannerList(data));
    }).catch(() => {
      console.log("轮播图数据传输错误");
    })
  }
};

export const getRecommendList = () => {
  return (dispatch: Dispatch<ChangeRecommendListAction | ChangeEnterLoadingAction>) => {
    getRecommendListRequest().then((data: RecommendListItem[]) => {
      dispatch(changeRecommendList(data));
      dispatch(changeEnterLoading(false)); // 改变 loading
    }).catch(() => {
      console.log("推荐歌单数据传输错误");
    });
  }
};
