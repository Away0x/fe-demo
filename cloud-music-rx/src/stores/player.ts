import { BehaviorSubjectStore } from '@away0x/react-rx-store';

import { PlayMode } from '@/constants';

export interface PlayerState {
  mode: PlayMode; // 播放模式
  fullScreen: boolean; // 播放器是否为全屏模式
  playing: boolean; // 当前歌曲是否播放
  currentIndex: number; // 当前歌曲在播放列表的索引位置
  showPlayList: boolean; // 是否展示播放列表
  sequencePlayList: any[]; // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList: any[];
  currentSong: null | any;
  speed: number; // 播放速度
}

export class PlayerStore extends BehaviorSubjectStore<PlayerState> {

  public readonly defaultState: PlayerState = {
    mode: PlayMode.sequence,
    fullScreen: false,
    playing: false,
    currentIndex: -1,
    showPlayList: false,
    sequencePlayList: [],
    playList: [],
    currentSong: null,
    speed: 1,
  }

  /** 切换播放状态 */
  public togglePlaying(status: boolean) {
    this.commit(state => state.playing = status);
  }

  /** 切换播放器全屏显示 */
  public toggleFullScreen(status: boolean) {
    this.commit(state => state.fullScreen = status);
  }

  /** 切换播放列表显示 */
  public toggleShowPlayList(status: boolean) {
    this.commit(state => state.showPlayList = status);
  }

  /** 切换歌曲 */
  public changeCurrentIndex(index: number) {}
  public changeCurrentSong(song: any) {}

  /** 切换播放模式 */
  public changeMode(mode: PlayMode) {}

  /** 播放列表 */
  public changePlayList() {}

  /** 修改播放速度 */
  public changeSpeed() {}

}


export const playerStore = new PlayerStore();