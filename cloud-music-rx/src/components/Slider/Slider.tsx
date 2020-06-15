import React, { useState, useEffect } from 'react';
import Swiper from 'swiper';
import "swiper/css/swiper.css";
import c from 'classnames';

import s from './Slider.module.less';

const createSlider = () => new Swiper(`.${s.sliderContainer}`, {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: { el: '.swiper-pagination' },
});

type SliderProps = {
  list: Resp.BannerListItem[];
};

function Slider({
  list,
}: SliderProps) {
  const [sliderSwiper, setSliderSwiper] = useState<Swiper | null>(null);

  useEffect(() => {
    if (list.length && !sliderSwiper) {
      setSliderSwiper(createSlider());
    }
  }, [list, sliderSwiper]);

  return (
    <div className={c('slider-component', s.sliderComponent)}>
      <div className={s.before}></div>
      <div className={s.sliderContainer}>
        <div className="swiper-wrapper">
          {
            list.map((slider, i) => {
              return (
                <div className="swiper-slide" key={slider.imageUrl + i}>
                  <div className={s.sliderNav}>
                    <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
}

export default React.memo(Slider);
