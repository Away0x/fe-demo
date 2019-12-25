import styled from 'styled-components';

import { RankSongItem } from '@/interfaces';
import helpers from '@/assets/style/helpers';

interface ListProps {
  globalRank: boolean; // 代表是否为全球榜
}

export const List = styled.ul<ListProps>`
  margin-top: 10px;
  padding: 0 5px;
  display: ${props => props.globalRank ? "flex" : ""};
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  background: ${helpers.background_color};
  &::after {
    content: "";
    display: block;
    width: 32vw;
  }
`;

interface ListItemProps {
  tracks: RankSongItem[]; // length > 0 表示为全球榜
}

export const ListItem = styled.li<ListItemProps>`
  display: ${props => props.tracks.length ? "flex" : ""};
  padding: 3px 0;
  border-bottom: 1px solid ${helpers.border_color};
  .img_wrapper {
    width:  ${props => props.tracks.length ? "27vw" : "32vw"};
    height: ${props => props.tracks.length ? "27vw" : "32vw"};
    border-radius: 3px;
    position: relative;
    .decorate {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient (hsla (0,0%,100%,0),hsla (0,0%,43%,.4));
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    .update_frequecy {
      position: absolute;
      left: 7px;
      bottom: 7px;
      font-size: ${helpers.font_size_ss};
      color: ${helpers.font_color_light};
    }
  }
`;

export const SongList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 10px;
  >li {
    font-size: ${helpers.font_size_s};
    color: grey;
  }
`;
