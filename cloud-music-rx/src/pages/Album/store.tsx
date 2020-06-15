import { BehaviorSubjectStore, useSubjectStore, createContextStore } from '@away0x/react-rx-store';

import { getAlbumDetailRequest } from '@/services';

export interface AlbumState {
  currentAlbum: Resp.AlbumListItem | null;
  enterLoading: boolean;
  pullUpLoading: boolean;
  startIndex: number;
  totalCount: number;
}

class AlbumStore extends BehaviorSubjectStore<AlbumState> {

  public readonly defaultState: AlbumState = {
    currentAlbum: null,
    enterLoading: true,
    pullUpLoading: false,
    startIndex: 0,
    totalCount: 0,
  };

  public async getAlbumDetail(id: number) {
    try {
      const detail = await getAlbumDetailRequest(id);

      this.commit(state => {
        state.currentAlbum = detail;
        state.startIndex = 0;
        state.enterLoading = false;
        state.pullUpLoading = false;

        if (detail && detail.tracks) {
          state.totalCount = detail.tracks.length;
        }
      });
    } catch (err) {
      console.warn('获取 album 数据失败', err);
      this.commit(state => {
        state.enterLoading = false;
        state.pullUpLoading = false;
      });
    }
  }

}

export const albumStore = new AlbumStore();

const Store = createContextStore(() => {
  return useSubjectStore(albumStore);
});

export const AlbumProvider = Store.Provider;

export const useAlbumState = () => {
  return Store.useStore();
};
