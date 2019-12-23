import Service from './base';
import {
  BannerListItem,
  BannerRequestResp,
  RecommendListItem,
  RecommendListRequestResp,
  SingerListItem,
  SingerListRequestResp,
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
