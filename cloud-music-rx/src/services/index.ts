import { Toast } from 'antd-mobile';

import { Request } from '@/tools/request';
import { API_ROOT } from '@/config';

export const commonRequest = new Request({
  baseURL: API_ROOT,
  requestInterceptor(config) { return config; },
  responseInterceptor(resp) {
    return resp.data;
  },
  errorResolve(err, config) {
    const errorMsg = (err || {}).message || '网络错误';

    Toast.fail(errorMsg);
    console.log('[commonRequest] 网络错误: ', err, config);
    return { status: false, message: '请求错误', data: null };
  },
});

/** 获取 banner 数据 */
export const getBannerRequest = async (): Promise<Resp.BannerListItem[]> => {
  const result = await commonRequest.get({
    url: '/banner',
  }) as Resp.BannerRequestResp;

  return result?.banners || [];
}

/** 获取推荐列表 */
export const getRecommendListRequest = async (): Promise<Resp.RecommendListItem[]> => {
  const result = await commonRequest.get({
    url: '/personalized',
  }) as Resp.RecommendListRequestResp;

  return result?.result || [];
};

/** 获取热门歌手列表 */
export const getHotSingerListRequest = async (count: number): Promise<Resp.SingerListItem[]> => {
  const result = await commonRequest.get({
    url: '/top/artists',
    params: {
      offset: count,
    },
  }) as Resp.SingerListRequestResp;

  return result?.artists || [];
};

/** 获取歌手列表 */
export const getSingerListRequest = async (category: string, alpha: string, count: number): Promise<Resp.SingerListItem[]> => {
  const result = await commonRequest.get({
    url: '/artist/list', params: {
      cat: category,
      initial: alpha.toLowerCase(),
      offset: count,
    }
  }) as Resp.SingerListRequestResp;

  return result?.artists || [];
};

/** 获取排行榜列表 */
export const getRankListRequest = async (): Promise<Resp.RankListItem[]> => {
  const result = await commonRequest.get({
    url: '/toplist/detail',
  }) as Resp.RankListRequestResp;

  return result?.list || [];
};

/** 获取排榜单详情列表 */
export const getAlbumDetailRequest = async (id: number): Promise<Resp.AlbumListItem | null> => {
  const result = await commonRequest.get({
    url: '/playlist/detail',
    params: {
      id,
    },
  }) as Resp.AlbumListRequestResp;

  return result?.playlist || null;
};

/** 获取歌手详情 */
export const getSingerInfoRequest = async (id: number): Promise<Resp.SingerInfoRequestResp | null> => {
  const result = await commonRequest.get({
    url: '/artists',
    params: {
      id,
    },
  });

  return result;
};

/** 获取热搜关键字 */
export const getHotKeyWordsRequest = async (): Promise<Resp.HotKeyWordItem[]> => {
  const result = await commonRequest.get({
    url: '/search/hot',
  }) as Resp.HotKeyWordsRequestResp;

  return result?.result?.hots || [];
};

/** 关键字获取推荐列表 */
export const getSuggestListRequest = async (query: string): Promise<Resp.SuggestData> => {
  const result = await commonRequest.get({
    url: '/search/suggest',
    params: {
      keywords: query,
    },
  }) as Resp.SuggestListRequestResp;

  return result?.result || [];
};

/** 关键字获取歌曲列表 */
export const getResultSongsListRequest = async (query: string): Promise<Resp.SongListItem[]> => {
  const result = await commonRequest.get({
    url: '/search',
    params: {
      keywords: query,
    },
  }) as Resp.ResultSongsListRequestResp;

  return result?.result?.songs || [];
};

/** 获取歌曲详情 */
export const getSongDetailRequest = async (id: number): Promise<any> => {
  
}