import React, { useState, useEffect } from 'react';
import 'swiper/css/swiper.css';
import Swiper from 'swiper';

import { BannerListItem } from '@/interfaces';
import { SliderContainer } from './index.style';

const createSlider = () => new Swiper('.slider-container', {
  loop: true,
  autoplay: true,
  pagination: { el: '.swiper-pagination' },
});

interface SliderProps {
  bannerList: BannerListItem[]
}

const Slider: React.FC<SliderProps> = ({ bannerList }) => {
  const [sliderSwiper, setSliderSwiper] = useState<Swiper | null>(null);

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      setSliderSwiper(createSlider());
    }
  }, [bannerList, sliderSwiper]);

  return (
    <SliderContainer>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {
            bannerList.map((slider, i) => {
              return (
                <div className="swiper-slide" key={slider.imageUrl + i}>
                  <div className="slider-nav">
                    <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className="swiper-pagination"></div>
      </div>

      <div className="before"></div>
    </SliderContainer>
  );
};

export default React.memo(Slider);
