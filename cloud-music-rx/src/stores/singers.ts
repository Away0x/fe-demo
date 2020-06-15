import { BehaviorSubjectStore } from '@away0x/react-rx-store';

import { getHotSingerListRequest, getSingerListRequest } from '@/services';

export interface SingersState {
  category: string; // 类别
  alpha: string; // 字母
  singerList: Resp.SingerListItem[]; // 歌手列表
  enterLoading: boolean;        // 控制进场 Loading
  pullUpLoading: boolean;       // 控制上拉加载动画
  pullDownLoading: boolean;     // 控制下拉加载动画
  listOffset: number; // 列表偏移量
}

/**
 * 歌手页面 store
 */
class SingersStore extends BehaviorSubjectStore<SingersState> {

  public readonly defaultState: SingersState = {
    category: '',
    alpha: '',
    singerList: [],
    enterLoading: true,
    pullUpLoading: false,
    pullDownLoading: false,
    listOffset: 0,
  };

  /** 加载热门歌手 */
  public async getHotSingerList() {
    try {
      const list = await getHotSingerListRequest(0);

      this.commit(state => {
        state.singerList = list || [];
        state.enterLoading = false;
        state.pullDownLoading = false;
        state.listOffset = list.length;
      });
    } catch (err) {
      this.commit(state => {
        state.enterLoading = false;
        state.pullDownLoading = false;
      });
      console.warn('热门歌手数据获取失败: ', err);
    }
  }

  /** 加载更多热门歌手 */
  public async refreshMoreHotSingerList() {
    try {
      const list = await getHotSingerListRequest(this.state.listOffset);
      const newList = this.state.singerList.concat(list || []);

      this.commit(state => {
        state.singerList = newList;
        state.pullUpLoading = false;
        state.listOffset = newList.length;
      });
    } catch (err) {
      this.commit(state => {
        state.pullUpLoading = false;
      });
      console.warn('更多热门歌手数据获取失败: ', err);
    }
  }

  /** 加载对应类别的歌手 */
  public async getSingerList() {
    try {
      const list = await getSingerListRequest(this.state.category, this.state.alpha, 0);

      this.commit(state => {
        state.singerList = list;
        state.enterLoading = false;
        state.pullDownLoading = false;
        state.listOffset = list.length;
      });
    } catch (err) {
      this.commit(state => {
        state.enterLoading = false;
        state.pullDownLoading = false;
      });
      console.warn('类别歌手数据获取失败: ', err);
    }
  }

  /** 加载更多歌手 */
  public async refreshMoreSingerList() {
    try {
      const list = await getSingerListRequest(this.state.category, this.state.alpha, this.state.listOffset);
      const newList = this.state.singerList.concat(list);

      this.commit(state => {
        state.singerList = newList;
        state.pullUpLoading = false;
        state.listOffset = newList.length;
      });
    } catch (err) {
      this.commit(state => {
        state.pullUpLoading = false;
      });
      console.warn('加载更多歌手数据获取失败: ', err);
    }
  }

}

export const singersStore = new SingersStore();
