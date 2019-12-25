import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { RankListItem } from '@/interfaces';
import {
  List,
  ListItem,
  SongList,
} from './index.style';

interface RankListProps {
  global?: boolean; // 是否为全球榜
  list: RankListItem[];
}

const RankList: React.FC<RankListProps & RouteComponentProps> = ({
  global = false,
  list,

  history,
}) => {
  const enterDetail = (detail: RankListItem) => {
    history.push(`/rank/${detail.id}`)
  }

  return (
    <List globalRank={global}>
      {
        list.map((item, i) => {
          return (
            <ListItem key={i} tracks={item.tracks} onClick={() => enterDetail(item)}>
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

export default React.memo<RankListProps>(withRouter(RankList) as any);
