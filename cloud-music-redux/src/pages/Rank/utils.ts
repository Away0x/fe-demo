import { RankTypes } from '@/constants';
import { RankListItem } from '@/interfaces';

// 处理数据，找出第一个没有歌名的排行榜的索引
export const filterIndex = (rankList: RankListItem[]) => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
};

//找出排行榜的编号
export const filterIdx = (name: string) => {
  for (var key in RankTypes) {
    if (RankTypes[key] === name) return key;
  }
  return null;
};
