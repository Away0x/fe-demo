import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RouteConfigComponentProps } from 'aw-react-router-helper';

import { useAuthState, useGlobalState, globalStore } from '@/stores';
import { windowOpen } from '@/tools/dom';

/**
 * 路由之下最顶层的组件，可在其中监听全局 store 变化，从而进行路由跳转等操作
 */
function RootLayout({
  renderRoutes,
}: RouteConfigComponentProps<any, App.RouteMeta>) {
  const history = useHistory();
  const { isLogin } = useAuthState();
  const { redirect } = useGlobalState();

  // 登录状态判断
  useEffect(() => {
    console.log(`[RootLayout] watch isLogin Status: ${isLogin}`);
  }, [isLogin]);

  // 路由重定向
  useEffect(() => {
    if (!redirect) return;

    console.log(`[RootLayout] redirect to ${redirect.path}`, redirect);

    if (redirect.isLink) {
      windowOpen(redirect.path);
      return;
    } else {
      history.push(redirect.path);
    }
  }, [redirect, history]);

  return (
    <>
      {renderRoutes()}
    </>
  );
}

export default React.memo(RootLayout);