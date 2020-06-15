import { BehaviorSubjectStore, useSubjectStore, createContextStore } from '@away0x/react-rx-store';

import { getSingerInfoRequest } from '@/services';

export interface SingerState {
  artist: Resp.ArtistInfo | null,
  songsOfArtist: Resp.SongListItem[];
  loading: boolean;
}

class SingerStore extends BehaviorSubjectStore<SingerState> {

  public readonly defaultState: SingerState = {
    artist: null,
    songsOfArtist: [],
    loading: true,
  }

  public async getSingerInfo(id: number) {
    try {
      const data = await getSingerInfoRequest(id);

      this.commit(state => {
        state.loading = false;
        if (data) {
          state.artist = data.artist;
          state.songsOfArtist = data.hotSongs || [];
        }
      });
    } catch (err) {
      console.warn('获取歌手数据失败', err);
      this.commit(state => state.loading = false);
    }
  }

}

export const singerStore = new SingerStore();

const Store = createContextStore(() => {
  return useSubjectStore(singerStore);
});

export const SingerProvider = Store.Provider;

export const useSingerState = () => {
  return Store.useStore();
}