import React, { useEffect, useRef, memo } from 'react';

import s from './Marquee.module.less';

type MarqueeProps = {
  text: string;
};

const Marquee = memo<MarqueeProps>(({
  text,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const txtRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !txtRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const txtWidth = txtRef.current.offsetWidth;
    let w = containerWidth;

    const timer = setInterval(() => {
      w = (w + txtWidth) === 0 ? containerWidth : w - 1;
      txtRef.current!.style.transform = `translate(${w}px)`;
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={s.container} ref={containerRef}>
      <div ref={txtRef}>{text}</div>
    </div>
  );
});

export default Marquee;
