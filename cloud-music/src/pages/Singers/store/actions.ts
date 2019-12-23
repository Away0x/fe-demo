import { RootState } from '@/store';
import * as actionTypes from './action-types';
import {
  getHotSingerListRequest,
  getSingerListRequest,
} from '@/services';
import { AsyncAction } from '@/interfaces';
import {
  ChangeSingerListAction,
  ChangePageCountAction,
  ChangeEnterLoadingAction,
  ChangePullUpLoadingAction,
  ChangePullDownLoadingAction,
} from './types';

const changeSingerList = (payload: any[]): ChangeSingerListAction => ({
  type: actionTypes.CHANGE_SINGER_LIST,
  payload,
});

export const changePageCount = (payload: number): ChangePageCountAction => ({
  type: actionTypes.CHANGE_PAGE_COUNT,
  payload
});

// 进场 loading
export const changeEnterLoading = (payload: boolean): ChangeEnterLoadingAction => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  payload
});

// 滑动最底部 loading
export const changePullUpLoading = (payload: boolean): ChangePullUpLoadingAction => ({
  type: actionTypes.CHANGE_PULLUP_LOADING,
  payload
});

// 顶部下拉刷新 loading
export const changePullDownLoading = (payload: boolean): ChangePullDownLoadingAction => ({
  type: actionTypes.CHANGE_PULLDOWN_LOADING,
  payload
});

// 第一次加载热门歌手
export const getHotSingerList = (): AsyncAction<
  RootState,
  ChangeSingerListAction | ChangeEnterLoadingAction | ChangePullDownLoadingAction
>  => {
  return (dispatch) => {
    getHotSingerListRequest(0).then(data => {
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    }).catch(() => {
      console.log('热门歌手数据获取失败');
    })
  }
};

// 加载更多热门歌手
export const refreshMoreHotSingerList = (): AsyncAction<
  RootState,
  ChangeSingerListAction | ChangePullUpLoadingAction
> => {
  return (dispatch, getState) => {
    const pageCount = getState().singers.pageCount;
    const singerList = getState().singers.singerList;

    getHotSingerListRequest(pageCount).then(artists => {
      const data = [...singerList, ...artists];
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false));
    }).catch(() => {
      console.log('热门歌手数据获取失败');
    });
  }
};

// 第一次加载对应类别的歌手
export const getSingerList = (category: string, alpha: string): AsyncAction<
  RootState,
  ChangeSingerListAction | ChangeEnterLoadingAction | ChangePullDownLoadingAction
> => {
  return (dispatch, getState) => {
    getSingerListRequest(category, alpha, 0).then(data => {
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    }).catch(() => {
      console.log('歌手数据获取失败');
    });
  }
};

// 加载更多歌手
export const refreshMoreSingerList = (category: string, alpha: string): AsyncAction<
  RootState,
  ChangeSingerListAction | ChangePullUpLoadingAction
> => {
  return (dispatch, getState) => {
    const pageCount = getState().singers.pageCount;
    const singerList = getState().singers.singerList;

    getSingerListRequest(category, alpha, pageCount).then(artists => {
      const data = [...singerList, ...artists];
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false));
    }).catch(() => {
      console.log('歌手数据获取失败');
    });
  }
};
