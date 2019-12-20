import Service from './base';
import {
  BannerListItem,
  BannerRequestResp,
  RecommendListItem,
  RecommendListRequestResp,
} from '@/interfaces';

export const getBannerRequest = async (): Promise<BannerListItem[]> => {
  const result = await Service.get<BannerRequestResp>({ url: '/banner' });

  return result?.banners || [];
}

export const getRecommendListRequest = async (): Promise<RecommendListItem[]> => {
  const result = await Service.get<RecommendListRequestResp>({ url: '/personalized' })

  return result?.result || [];
}
