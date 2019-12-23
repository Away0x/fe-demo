import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type AsyncAction<State, Actions extends Action, Resp = any> =
  ThunkAction<Resp, State, any, Actions>;

export interface BannerListItem {
  imageUrl: string;
}

export interface RecommendListItem {
  id: number,
  picUrl: string,
  playCount: number,
  name: string,
}

export interface BannerRequestResp {
  banners: BannerListItem[];
  code: number;
}

export interface RecommendListRequestResp {
  result: RecommendListItem[];
  code: number;
}

export interface HorizenItem {
  key: string;
  name: string;
}

export interface SingerListItem {
  picUrl: string;
  name: string;
  accountId: number;
}

export interface SingerListRequestResp {
  artists: SingerListItem[]
  code: number;
}
