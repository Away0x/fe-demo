import React from 'react';

import { RankListItem } from '@/interfaces';
import { filterIdx } from '../utils';
import {
  List,
  ListItem,
  SongList,
} from './index.style';

interface RankListProps {
  global?: boolean; // 是否为全球榜
  list: RankListItem[];
}

const RankList: React.FC<RankListProps> = ({
  global = false,
  list,
}) => {
  const enterDetail = (name: string) => {
    const idx = filterIdx(name);
    if (idx === null) {
      alert("暂无相关数据");
      return;
    }
  };

  return (
    <List globalRank={global}>
      {
        list.map((item, i) => {
          return (
            <ListItem key={i} tracks={item.tracks} onClick={() => enterDetail(item.name)}>
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>

              {
                item.tracks.length
                  ? <SongList>
                      {
                        item.tracks.map((t, ti) => <li key={ti}>{ti + 1}. {t.first} - {t.second}</li>)
                      }
                    </SongList>
                  : null
              }

            </ListItem>
          )
        })
      }
    </List>
  );
};

export default React.memo<typeof RankList>(RankList);
