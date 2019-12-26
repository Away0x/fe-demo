import React from 'react';
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import { NavLink } from 'react-router-dom';

import Player from '@/pages/Player';
import {
  Top,
  Tab,
  TabItem,
} from './index.style';

const Home: React.FC<RouteConfigComponentProps> = ({ route, history }) => {
  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">Web App</span>
        <span className="iconfont search" onClick={() => history.push('/search')}>&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeClassName="selected"><TabItem><span>推荐</span></TabItem></NavLink>
        <NavLink to="/singers" activeClassName="selected"><TabItem><span>歌手</span></TabItem></NavLink>
        <NavLink to="/rank" activeClassName="selected"><TabItem><span>排行榜</span></TabItem></NavLink>
      </Tab>
      { renderRoutes(route?.routes) }

      <Player />
    </div>
  );
};

export default React.memo(Home);
