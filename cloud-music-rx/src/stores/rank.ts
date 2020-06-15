import { BehaviorSubjectStore } from '@away0x/react-rx-store';

import { getRankListRequest } from '@/services';

export interface RankState {
  rankList: Resp.RankListItem[];
  loading: boolean;
}

class RankStore extends BehaviorSubjectStore<RankState> {

  public readonly defaultState: RankState = {
    rankList: [],
    loading: true,
  };

  /** 加载排行榜数据 */
  public async getRankList() {
    this.commit((state) => {
      state.loading = true;
    });
    try {
      const list = await getRankListRequest();

      this.commit((state) => {
        state.loading = false;
        state.rankList = list || [];
      });
    } catch (err) {
      this.commit((state) => {
        state.loading = false;
      });
      console.warn('获取排行榜数据失败: ', err);
    }
  }

}

export const rankStore = new RankStore();
