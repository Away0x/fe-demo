import { BehaviorSubjectStore, useSubjectStore, createContextStore } from '@away0x/react-rx-store';

import {
  getHotKeyWordsRequest,
  getSuggestListRequest,
  getResultSongsListRequest,
} from '@/services';

export interface SearchState {
  enterLoading: boolean;
  hotList: Resp.HotKeyWordItem[];
  suggestList: Resp.SuggestData;
  songsList: Resp.SongListItem[];
}

class SearchStore extends BehaviorSubjectStore<SearchState> {

  public readonly defaultState: SearchState = {
    enterLoading: false,
    hotList: [],
    suggestList: {},
    songsList: [],
  };

  /** 获取热门搜索 */
  public async getHotKeyWords() {
    try {
      const list = await getHotKeyWordsRequest();

      this.commit(state => {
        state.hotList = list || [];
      });
    } catch (err) {
      console.warn('获取热门搜索失败', err)
    }
  }

  /** 获取搜索列表 */
  public getSuggestList(query: string) {
    this.commit(state => state.enterLoading = true);

    getSuggestListRequest(query)
      .then(data => {
        this.commit(state => {
          state.suggestList = data;
        });
      })
      .catch(err => {
        console.warn('getSuggestListRequest error', err);
      });

    getResultSongsListRequest(query)
      .then(data => {
        this.commit(state => {
          state.songsList = data || [];
          state.enterLoading = false;
        });
      })
      .catch(err => {
        console.warn('getResultSongsListRequest error', err);
      })
  }

}

export const searchStore = new SearchStore();

const Store = createContextStore(() => {
  return useSubjectStore(searchStore);
});

export const SearchProvider = Store.Provider;

export const useSearchState = (): SearchState => {
  return Store.useStore();
}
