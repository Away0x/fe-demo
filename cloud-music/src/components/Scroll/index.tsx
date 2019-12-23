import React, {
  forwardRef,
  useState,
  useRef,
  useMemo,
  useEffect,
  useImperativeHandle,
} from 'react';
import BScroll from 'better-scroll';

import { debounce } from '@/utils';
import Loading from '@/components/Loading';
import LoadingV2 from '@/components/Loading/v2';

import {
  ScrollContainer,
  PullUpLoading,
  PullDownLoading,
} from './index.style';

interface ScrollProps {
  direction?: 'vertical' | 'horizental'; // 滚动的方向
  click?: boolean;                       // 是否支持点击
  refresh?: boolean;                     // 是否刷新
  pullUpLoading?: boolean;               // 是否显示上拉 loading 动画
  pullDownLoading?: boolean;             // 是否显示下拉 loading 动画
  bounceTop?: boolean;                   // 是否支持向上吸顶
  bounceBottom?: boolean;                // 是否支持向下吸底
  onScroll?: Function;                   // 滑动触发的回调函数
  pullUp?: Function;                     // 上拉加载逻辑
  pullDown?: Function;                   // 下拉加载逻辑

  children: React.ReactNode;
}

export interface ScrollerHandlers {
  refresh(): void
  getBScroll(): BScroll | undefined
}

const Scroll = forwardRef<ScrollerHandlers, ScrollProps>(({
  children,

  direction = 'vertical',
  click = true,
  refresh = true,
  bounceTop = true,
  bounceBottom = true,
  pullUpLoading = false,
  pullDownLoading = false,
  onScroll,
  pullUp,
  pullDown,
}, ref) => {
  const scrollContaninerRef = useRef<any>();
  const [bScroll, setBScroll] = useState<BScroll | null>(null);

  const pullUpDebounce = useMemo(() => {
    if (!pullUp) return;
    return debounce(pullUp, 300);
    // deps 不能省略，不然拿到的始终是第一次 pullUp 函数的引用，相应的闭包作用域变量都是第一次的，产生闭包陷阱
  }, [pullUp]);

  const pullDownDebounce = useMemo(() => {
    if (!pullDown) return;
    return debounce(pullDown, 300);
  }, [pullDown]);

  // 创建 better-scroll
  useEffect(() => {
    setBScroll(new BScroll(scrollContaninerRef.current!, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce: { top: bounceTop, bottom: bounceBottom },
    }));

    return () => {
      setBScroll(null);
    }
    // eslint-disable-next-line
  }, []);

  // 绑定 scroll 事件
  useEffect(() => {
    if (!bScroll || !onScroll) return;

    bScroll.on('scroll', (scroll: any) => {
      onScroll(scroll);
    });

    return () => {
      bScroll.off('scroll');
    };
  }, [onScroll, bScroll]);

  // 绑定 scrollEnd 事件 (上拉)
  useEffect(() => {
    if (!bScroll || !pullUp) return;
    bScroll.on('scrollEnd', () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce && pullUpDebounce();
      }
    });

    return () => {
      bScroll.off('scrollEnd');
    }
  }, [pullUpDebounce, pullUp, bScroll]);

  // 绑定 touchEnd 事件 (下拉)
  useEffect(() => {
    if (!bScroll || !pullDown) return;
    bScroll.on('touchEnd', (pos: any) => {
      //判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce && pullDownDebounce();
      }
    });

    return () => {
      bScroll.off('touchEnd');
    }
  }, [pullDownDebounce, pullDown, bScroll]);

  // 每次重新渲染都要刷新实例，防止无法滑动
  useEffect(() => {
    if (refresh && bScroll) { bScroll.refresh(); }
  });

  // 暴露给外部的方法
  useImperativeHandle(ref, () => {
    return {
      refresh() {
        if (bScroll) {
          bScroll.refresh();
          bScroll.scrollTo(0, 0);
        }
      },
      getBScroll() {
        if (bScroll) { return bScroll; }
      }
    }
  });

  const PullUpdisplayStyle = pullUpLoading ? { display: '' } : { display: 'none' };
  const PullDowndisplayStyle = pullDownLoading ? { display: '' } : { display: 'none' };

  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {children}
      {/* 滑到底部加载动画 */}
      <PullUpLoading style={PullUpdisplayStyle}>
        <Loading />
      </PullUpLoading>
      {/* 顶部下拉刷新动画 */}
      <PullDownLoading style={PullDowndisplayStyle}>
        <LoadingV2 />
      </PullDownLoading>
    </ScrollContainer>
  )
});

export default Scroll;
