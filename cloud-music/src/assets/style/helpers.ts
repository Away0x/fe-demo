//扩大可点击区域
const extend_click = () => {
  return `
    position: relative;
    &:before{
      content: '';
      position: absolute;
      top: -10px; bottom: -10px; left: -10px; right: -10px;
    };
  `
};

//一行文字溢出部分用...代替
const no_wrap = () => {
  return `
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `
};

export default {
  // var
  theme_color: '#d44439',
  theme_color_shadow: 'rgba(212, 68, 57, .5)',
  font_color_light: '#f1f1f1',
  font_color_desc: '#2E3030',
  font_color_desc_v2: '#bba8a8',//略淡
  font_size_ss: '10px',
  font_size_s: '12px',
  font_size_m: '14px',
  font_size_l: '16px',
  font_size_ll: '18px',
  border_color: '#e4e4e4',
  background_color: '#f2f3f4',
  background_color_shadow: 'rgba(0, 0, 0, 0.3)',
  highlight_background_color: '#fff',

  // function
  extend_click,
  no_wrap
};
