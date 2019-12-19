import styled from 'styled-components';

import helpers from '@/assets/style/helpers';

export const ListWrapper = styled.div`
  max-width: 100%;
  .title {
    font-weight: 700;
    padding-left: 6px;
    font-size: 14px;
    line-height: 60px;
    color: ${helpers.font_color};
  }
`;
export const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const ListItem = styled.div`
  position: relative;
  width: 32%;

  .img_wrapper {
    /* 给图片上的图标和文字提供一个遮罩，因为在字体颜色是白色，在面对白色图片背景的时候，文字会看不清或者看不到，因此提供一个阴影来衬托出文字 */
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient (hsla (0,0%,43%,.4),hsla (0,0%,100%,0));
    }
    position: relative;
    height: 0;
    padding-bottom: 100%;
    .play_count {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${helpers.font_size_s};
      line-height: 15px;
      color: ${helpers.font_color_light};
      .play {
        vertical-align: top;
      }
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
  }
  .desc {
      overflow: hidden;
      margin-top: 2px;
      padding: 0 2px;
      height: 50px;
      text-align: left;
      font-size: ${helpers.font_size_s};
      line-height: 1.4;
      color: ${helpers.font_color_desc};
    }
`;
