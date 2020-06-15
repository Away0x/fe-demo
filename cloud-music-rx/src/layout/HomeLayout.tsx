import React, { useState, useCallback, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import c from 'classnames';
import { Drawer, Button } from 'antd-mobile';
import { RouteConfigComponentProps } from 'aw-react-router-helper';

import { authInteractor } from '@/interactors/auth';
import { useAuthState, globalStore } from '@/stores';
// import Player from '@/components/Player';
import Scroll from '@/components/Scroll';

import s from './HomeLayout.module.less';

const Sidebar = React.memo((props: {
  login: () => void;
  logout: () => void;
  isLogin: boolean;
  userInfo: Auth.UserInfo | null;
}) => {
  return (
    <div className={s.sidebar}>
      {props.isLogin && props.userInfo ? 
        (
          <>
            <h3 className={s.userName}>{props.userInfo.name}</h3>
            <Button onClick={props.logout}>退出</Button>
          </>
        ) :
        (
          <Button onClick = {props.login}>登录</Button>
        )
      }
      
      <Scroll>
        {
          [1, 2, 3, 4, 5, 6].map(i => {
            return <p key={i}>sidebar-item-{i}</p>
          })
        }
      </Scroll>
    </div>
  );
});

interface HomeLayoutProps extends RouteConfigComponentProps<any, App.RouteMeta> {}

function HomeLayout({
  renderRoutes,
}: HomeLayoutProps) {
  const [drawerStatus, setDrawerStatus] = useState(false);
  const { userInfo, isLogin } = useAuthState();

  const enterUserCenter = () => {
    setDrawerStatus(true);
  };

  const enterSearchPage = () => {
    globalStore.redirect({path: '/search'});
  };

  const login = useCallback(async () => {
    await authInteractor.login();
    globalStore.redirect({path: '/login'});
  }, []);

  const logout = useCallback(async () => {
    await authInteractor.logout();
  }, []);

  const sidebar = useMemo(() => {
    return <Sidebar isLogin={isLogin} userInfo={userInfo} login={login} logout={logout} />;
  }, [isLogin, userInfo, login, logout]);

  return (
    <div>
      <Drawer
        open={drawerStatus}
        style={{ minHeight: document.documentElement.clientHeight }}
        sidebar={sidebar}
        onOpenChange={_ => setDrawerStatus(!drawerStatus)}>
        <div className={s.top}>
          <span className={c('iconfont menu', s.icon, s.topText)} onClick={enterUserCenter}>&#xe65c;</span>
          <span className={s.topText}>云音悦</span>
          <span className={c('iconfont search', s.icon, s.topText)} onClick={enterSearchPage}>&#xe62b;</span>
        </div>
        <div className={s.tab}>
          <NavLink className={s.tabA} to="/recommend" activeClassName={s.tabASelected}>
            <div className={s.tabItem}><span> 推荐 </span></div>
          </NavLink>
          <NavLink className={s.tabA} to="/singers" activeClassName={s.tabASelected}>
            <div className={s.tabItem}><span> 歌手 </span></div>
          </NavLink>
          <NavLink className={s.tabA} to="/rank" activeClassName={s.tabASelected}>
            <div className={s.tabItem}><span> 排行榜 </span></div>
          </NavLink>
        </div>

        {renderRoutes()}

        {/* <Player /> */}
      </Drawer>
    </div>
  );
}

export default React.memo(HomeLayout);
