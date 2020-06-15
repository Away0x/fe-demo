import React from 'react';

import s from './ProgressCircle.module.less';

interface ProgressCircleProps {
  radius: number;
  percent: number;
  children: React.ReactNode;
};

function ProgressCircle ({
  radius,
  percent,
  children,
}: ProgressCircleProps) {
  // 整个背景的周长
  const dashArr = Math.PI * 100;
  // 没有高亮的部分，剩下高亮的就是进度
  const dashOffset = (1 - percent) * dashArr;

  return (
    <div className={s.circle}>
      <svg width={radius} height={radius} viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle className={s.progressBG} r="50" cx="50" cy="50" fill="transparent" />
        <circle className={s.progressBar} r="50" cx="50" cy="50" fill="transparent"
          strokeDasharray={dashArr}
          strokeDashoffset={dashOffset} />
      </svg>
      {children}
    </div>
  );
}

export default React.memo(ProgressCircle);
