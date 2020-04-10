import styled from 'styled-components';

import helpers from '@/assets/style/helpers';

interface ContainerProps {
  play?: number;
}

export const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${({play = 0}) => play > 0 ? "60px" : 0};
  width: 100%;
  z-index: 100;
  overflow: hidden;
  background: #f2f3f4;
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear{
    transform: translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active{
    transition: all .3s;
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit{
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit-active{
    transition: all .3s;
    transform: translate3d(100%, 0, 0);
  }
`;

interface ShortcutWrapperProps {
  show?: boolean;
}

export const ShortcutWrapper = styled.div<ShortcutWrapperProps>`
  position: absolute;
  top: 40px;
  bottom: 0;
  width: 100%;
  display: ${({show = false}) => show ? "" : "none"};
`;

export const HotKey = styled.div`
  margin: 0 20px 20px 20px;
  .title{
    padding-top: 35px;
    margin-bottom: 20px;
    font-size: ${helpers.font_size_m};
    color: ${helpers.font_color_desc_v2};
  }
  .item{
    display: inline-block;
    padding: 5px 10px;
    margin: 0 20px 10px 0;
    border-radius: 6px;
    background: ${helpers.highlight_background_color};
    font-size: ${helpers.font_size_m};
    color: ${helpers.font_color_desc};
  }
`;

export const List = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  overflow: hidden;
  .title {
    margin:10px 0 10px 10px;
    color: ${helpers.font_color_desc};
    font-size: ${helpers.font_size_s};
  }
`;

export const ListItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
  padding: 5px 0;
  align-items: center;
  border-bottom: 1px solid ${helpers.border_color};
  .img_wrapper {
    margin-right: 20px;
    img{
      border-radius: 3px;
      width: 50px;
      height: 50px;
    }
  }
  .name{
    font-size: ${helpers.font_size_m};
    color: ${helpers.font_color_desc};
    font-weight: 500;
  }
`;

export const SongItem = styled.ul`
  >li{
    display: flex;
    height: 60px;
    align-items: center;
    .index{
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .info{
      box-sizing: border-box;
      flex: 1;
      display: flex;
      height: 100%;
      padding: 5px 0;
      flex-direction: column;
      justify-content: space-around;
      border-bottom: 1px solid ${helpers.border_color};
      >span:first-child{
        color: ${helpers.font_color_desc};
      }
      >span:last-child{
        font-size: ${helpers.font_size_s};
        color: #bba8a8;
      }
    }
  }
`;
