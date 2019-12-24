import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

/** redux thunk action type */
export type AsyncAction<State, Actions extends Action, Resp = any> =
  ThunkAction<Resp, State, any, Actions>;

/** banner item */
export interface BannerListItem {
  imageUrl: string;
}

/** 推荐列表 item */
export interface RecommendListItem {
  id: number,
  picUrl: string,
  playCount: number,
  name: string,
}

/** 获取 banner 列表的请求响应类型 */
export interface BannerRequestResp {
  banners: BannerListItem[];
  code: number;
}

/** 获取 recommend 列表的请求响应类型 */
export interface RecommendListRequestResp {
  result: RecommendListItem[];
  code: number;
}

/** Horizen item */
export interface HorizenItem {
  key: string;
  name: string;
}

/** singer item */
export interface SingerListItem {
  picUrl: string;
  name: string;
  accountId: number;
}

/** 获取歌手列表的请求响应类型 */
export interface SingerListRequestResp {
  artists: SingerListItem[]
  code: number;
}

/** rank song item */
export interface RankSongItem {
  first: string;
  second: string;
}

/** rank item */
export interface RankListItem {
  name: string;
  coverImgId: string;
  coverImgUrl: string;
  updateFrequency: string;
  tracks: RankSongItem[];
}

/** 获取排行榜列表的请求响应类型 */
export interface RankListRequestResp {
  list: RankListItem[];
}

/** album creator */
export interface AlbumCreator {
  avatarUrl: string;
  nickname: string;
}

/** album track */
export interface AlbumTrack {
  name: string;
  ar: {name: string}[];
  al: {name: string},
}

/** album item */
export interface AlbumListItem {
  name: string;
  coverImgUrl: string;
  subscribedCount: number;
  creator: AlbumCreator;
  tracks: AlbumTrack[];
}

/** 获取榜单详情列表的请求响应类型 */
export interface AlbumListRequestResp {
  playlist: AlbumListItem;
  code: number;
}
