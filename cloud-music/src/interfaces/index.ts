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
