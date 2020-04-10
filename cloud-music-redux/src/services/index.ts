import Service from './base';
import {
  BannerListItem,
  BannerRequestResp,
  RecommendListItem,
  RecommendListRequestResp,
  SingerListItem,
  SingerListRequestResp,
  RankListItem,
  RankListRequestResp,
  AlbumListItem,
  AlbumListRequestResp,
  SingerInfoRequestResp,
  HotKeyWordsRequestResp,
  SuggestListRequestResp,
  ResultSongsListRequestResp,
  HotKeyWordItem,
  SongListItem,
} from '@/interfaces';

/** 获取 banner 数据 */
export const getBannerRequest = async (): Promise<BannerListItem[]> => {
  const result = await Service.get<BannerRequestResp>({ url: '/banner' });

  return result?.banners || [];
}

/** 获取推荐列表 */
export const getRecommendListRequest = async (): Promise<RecommendListItem[]> => {
  const result = await Service.get<RecommendListRequestResp>({ url: '/personalized' })

  return result?.result || [];
};

/** 获取热门歌手列表 */
export const getHotSingerListRequest = async (count: number): Promise<SingerListItem[]> => {
  const result = await Service.get<SingerListRequestResp>({ url: '/top/artists', params: { offset: count } });

  return result?.artists || [];
};

/** 获取歌手列表 */
export const getSingerListRequest = async (category: string, alpha: string, count: number): Promise<SingerListItem[]> => {
  const result = await Service.get<SingerListRequestResp>({ url: '/artist/list', params: {
    cat: category,
    initial: alpha.toLowerCase(),
    offset: count,
  }});

  return result?.artists || [];
};

/** 获取排行榜列表 */
export const getRankListRequest = async (): Promise<RankListItem[]> => {
  const result = await Service.get<RankListRequestResp>({ url: '/toplist/detail' });

  return result?.list || [];
};

/** 获取排榜单详情列表 */
export const getAlbumDetailRequest = async (id: number): Promise<AlbumListItem | null> => {
  const result = await Service.get<AlbumListRequestResp>({ url: '/playlist/detail', params: {id} });

  return result?.playlist || null;
};

/** 获取歌手详情 */
export const getSingerInfoRequest = async (id: number): Promise<SingerInfoRequestResp | null> => {
  const result = await Service.get<SingerInfoRequestResp>({ url: '/artists', params: { id } });

  return result;
};

/** 获取热搜关键字 */
export const getHotKeyWordsRequest = async (): Promise<HotKeyWordItem[]> => {
  const result = await Service.get<HotKeyWordsRequestResp>({ url: '/search/hot' });

  return result?.result?.hots || [];
};

/** 关键字获取推荐列表 */
export const getSuggestListRequest = async (query: string): Promise<any> => {
  const result = await Service.get<SuggestListRequestResp>({ url: '/search/suggest', params: { keywords: query } });

  return result?.result || [];
};

/** 关键字获取歌曲列表 */
export const getResultSongsListRequest = async (query: string): Promise<SongListItem[]> => {
  const result = await Service.get<ResultSongsListRequestResp>({ url: '/search', params: { keywords: query } });

  return result?.result?.songs || [];
};
