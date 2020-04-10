import * as actionTypes from './action-types';
import { SingerListItem } from '@/interfaces';

export interface SingersState {
  singerList: SingerListItem[]; // 歌手列表
  enterLoading: boolean;        // 控制进场 Loading
  pullUpLoading: boolean;       // 控制上拉加载动画
  pullDownLoading: boolean;     // 控制下拉加载动画
  pageCount: number;            // 分页 count
}

export interface ChangeSingerListAction {
  type: typeof actionTypes.CHANGE_SINGER_LIST,
  payload: SingerListItem[];
}

export interface ChangePageCountAction {
  type: typeof actionTypes.CHANGE_PAGE_COUNT,
  payload: number;
}

export interface ChangeEnterLoadingAction {
  type: typeof actionTypes.CHANGE_ENTER_LOADING,
  payload: boolean;
}

export interface ChangePullUpLoadingAction {
  type: typeof actionTypes.CHANGE_PULLUP_LOADING,
  payload: boolean;
}

export interface ChangePullDownLoadingAction {
  type: typeof actionTypes.CHANGE_PULLDOWN_LOADING,
  payload: boolean;
}

export type SingersActions = ChangeSingerListAction
  | ChangePageCountAction
  | ChangeEnterLoadingAction
  | ChangePullUpLoadingAction
  | ChangePullDownLoadingAction;
