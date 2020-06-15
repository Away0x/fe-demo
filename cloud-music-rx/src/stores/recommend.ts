import { from, zip } from 'rxjs';
import { BehaviorSubjectStore } from '@away0x/react-rx-store';

import { getBannerRequest, getRecommendListRequest } from '@/services';

export interface RecommendState {
  bannerList: Resp.BannerListItem[];
  recommendList: Resp.RecommendListItem[];
  loading: boolean;
}

/**
 * 推荐页面 store
 */
class RecommendStore extends BehaviorSubjectStore<RecommendState> {

  public readonly defaultState: RecommendState = {
    bannerList: [],
    recommendList: [],
    loading: true,
  };

  public async initRecommendData() {
    if (this.state.bannerList.length && this.state.recommendList.length) return;
    
    const banner$ = from(getBannerRequest());
    const recommendList$ = from(getRecommendListRequest());
    const all$ = zip(banner$, recommendList$);

    this.commit(state => state.loading = true);
    all$.subscribe(
      (data) => {
        this.commit(state => {
          state.loading = false;
          state.bannerList = data[0];
          state.recommendList = data[1];
        });
      },
      (_) => {
        console.warn('数据获取失败');
        this.commit(state => {
          state.loading = false;
          state.bannerList = [];
          state.recommendList = [];
        });
      },
    );
  }

  /*
  public async getBannerList() {
    try {
      const bannerList = await getBannerRequest();

      this.commit(state => {
        state.bannerList = bannerList;
      });
    } catch (err) {
      this.commit(state => {
        state.bannerList = [];
        state.loading = false;
      });
      console.warn('轮播图数据获取失败: ', err);
    }
  }

  public async getRecommendList() {
    try {
      this.commit(state => state.loading = true);

      const recommendList = await getRecommendListRequest();

      this.commit(state => {
        state.recommendList = recommendList;
        state.loading = false;
      });
    } catch (err) {
      console.warn('歌单获取失败: ', err);
      this.commit(state => {
        state.recommendList = [];
        state.loading = false;
      });
    }
  }
  */

}

export const recommendStore = new RecommendStore();

