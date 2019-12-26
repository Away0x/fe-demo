import styled from 'styled-components';

import helpers from '@/assets/style/helpers';

export const PlayListWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: ${helpers.background_color_shadow};
  &.list-fade-enter{
    opacity: 0;
  }
  &.list-fade-enter-active{
    opacity: 1;
    transition: all 0.3s;
  }
  &.list-fade-exit{
    opacity: 1;
  }
  &.list-fade-exit-active{
    opacity: 0;
    transition: all 0.3s;
  }
  .list_wrapper{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    opacity: 1;
    border-radius: 10px 10px 0 0;
    background-color: ${helpers.highlight_background_color};
    transform: translate3d(0, 0, 0);
    .list_close{
      text-align: center;
      line-height: 50px;
      background: ${helpers.background_color};
      font-size: ${helpers.font_size_l};
      color: ${helpers.font_color_desc};
    }
  }
`;

export const ScrollWrapper = styled.div`
  height: 400px;
  overflow: hidden;
`;

export const ListHeader = styled.div`
  position: relative;
  padding: 20px 30px 10px 20px;
  .title{
    display: flex;
    align-items: center;
    >div{
      flex:1;
      .text{
        flex: 1;
        font-size: ${helpers.font_size_m};
        color: ${helpers.font_color_desc};
      }
    }
    .iconfont {
      margin-right: 10px;
      font-size: ${helpers.font_size_ll};
      color: ${helpers.theme_color};
    }
    .clear{
      ${helpers.extend_click()}
      font-size: ${helpers.font_size_l};
    }
  }
`;

export const ListContent = styled.div`
  .item{
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 30px 0 20px;
    overflow: hidden;
    .current{
      flex: 0 0 20px;
      width: 20px;
      font-size: ${helpers.font_size_s};
      color: ${helpers.theme_color};
    }
    .text{
      flex: 1;
      ${helpers.no_wrap()}
      font-size: ${helpers.font_size_m};
      color: ${helpers.font_color_desc_v2};
      .icon-favorite{
        color: ${helpers.theme_color};
      }
    }
    .like{
      ${helpers.extend_click()}
      margin-right: 15px;
      font-size: ${helpers.font_size_m};
      color: ${helpers.theme_color};
    }
    .delete{
      ${helpers.extend_click()}
      font-size: ${helpers.font_size_s};
      color: ${helpers.theme_color};
    }
  }
`;
