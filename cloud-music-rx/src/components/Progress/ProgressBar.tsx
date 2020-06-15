import React, { useRef, useEffect, useState } from 'react';

import { prefixStyle } from '@/tools/dom';

import s from './ProgressBar.module.less';

type TouchData = {
  initiated: boolean;
  startX: number;
  left: number;
};

type ProgressBarProps = {
  percent: number;
  percentChange: (p: number) => void;
};

const PROGRESS_BTN_WIDTH = 16;
const transform = prefixStyle('transform');

function ProgressBar({
  percent,
  percentChange,
}: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLDivElement | null>(null);

  const [touch, setTouch] = useState<TouchData>({
    initiated: false,
    startX: 0,
    left: 0,
  });

  const setOffset = (offsetWidth: number) => {
    if (!progressRef.current || !btnRef.current) return;
    progressRef.current.style.width = `${offsetWidth}px`;
    btnRef.current.style[transform as any] = `translate3d(${offsetWidth}px, 0, 0)`;
  };

  const changePercent = () => {
    if (!barRef.current || !progressRef.current) return;
    const barWidth = barRef.current.clientWidth - PROGRESS_BTN_WIDTH;
    const curPercent = progressRef.current.clientWidth / barWidth;
    percentChange(curPercent);
  };

  const progressClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left;
    setOffset(offsetWidth);
    changePercent();
  };

  const progressTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const startTouch: TouchData = {
      initiated: true,
      startX: e.touches[0].pageX,
      left: progressRef.current.clientWidth,
    };
    setTouch(startTouch);
  };

  const progressTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touch.initiated || !barRef.current) return;
    const deltaX = e.touches[0].pageX - touch.startX;
    const barWidth = barRef.current.clientWidth - PROGRESS_BTN_WIDTH;
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
    setOffset(offsetWidth);
  };

  const progressTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const endTouch = {...touch, initiated: false};
    setTouch(endTouch);
    changePercent();
  };
  
  useEffect(() => {
    if (!barRef.current || !progressRef.current || !btnRef.current) return;
    if (percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = barRef.current.clientWidth - PROGRESS_BTN_WIDTH;
      const offsetWidth = percent * barWidth;

      progressRef.current.style.width = `${offsetWidth}px`;
      btnRef.current.style[transform as any] = `translate3d(${offsetWidth}px, 0, 0)`;
    }
  }, [percent, touch.initiated]);

  return (
    <div className={s.bar}>
      <div ref={barRef} className={s.inner} onClick={progressClick}>
        <div ref={progressRef} className={s.progress}></div>
        <div ref={btnRef} className={s.btnWrapper}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}>
          <div className={s.btn}></div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProgressBar);
