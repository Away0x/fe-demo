import React, { lazy, Suspense } from 'react';
import { RouteConfig, AWRouter } from 'aw-react-router-helper';

import RootLayout from '@/layout/RootLayout';
import HomeLayout from '@/layout/HomeLayout';
import { globalStore } from '@/stores';

const SuspenseComponet = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  );
}

const Login = lazy(() => import(/* webpackChunkName: 'login' */'@/pages/Login'));

const Recommend = lazy(() => import(/* webpackChunkName: 'recommend' */'@/pages/Recommend'));
const Singers = lazy(() => import(/* webpackChunkName: 'singers' */'@/pages/Singers'));
const Rank = lazy(() => import(/* webpackChunkName: 'rank' */'@/pages/Rank'));

const Album = lazy(() => import(/* webpackChunkName: 'album' */'@/pages/Album'));
const Singer = lazy(() => import(/* webpackChunkName: 'singer' */'@/pages/Singer'));
const Search = lazy(() => import(/* webpackChunkName: 'search' */'@/pages/Search'));

const configs: RouteConfig<App.RouteMeta>[] = [
  {
    path: '/',
    component: RootLayout,
    routes: [
      {
        path: '/login',
        component: SuspenseComponet(Login),
        meta: {
          title: '登录',
        },
      },
      {
        path: '/',
        component: HomeLayout,
        routes: [
          {
            path: '/',
            redirect: '/recommend',
          },
          {
            path: '/recommend',
            component: SuspenseComponet(Recommend),
            meta: {
              title: '推荐',
            },
            routes: [
              {
                path: '/recommend/:id',
                component: SuspenseComponet(Album),
                meta: {
                  title: '歌单',
                },
              },
            ],
          },
          {
            path: '/singers',
            component: SuspenseComponet(Singers),
            meta: {
              title: '歌手',
            },
            routes: [
              {
                path: '/singers/:id',
                component: SuspenseComponet(Singer),
                meta: {
                  title: '歌手',
                },
              },
            ],
          },
          {
            path: '/rank',
            component: SuspenseComponet(Rank),
            meta: {
              title: '排行榜',
            },
            routes: [
              {
                path: '/rank/:id',
                component: SuspenseComponet(Album),
                meta: {
                  title: '歌单',
                },
              },
            ],
          },
          {
            path: '/album/:id',
            component: SuspenseComponet(Album),
            meta: {
              title: '歌单',
            },
          },
          {
            path: '/search',
            component: SuspenseComponet(Search),
            meta: {
              title: '搜索',
            },
          },
        ],
      },
    ]
  }
];

export const routerManager = AWRouter.instance<AWRouter<App.RouteMeta>>().load({
  configs,
  middlewares: [
    state => {
      // 记录路由 state
      globalStore.saveRouteState(state);
      // 修改 title
      if (state.meta) {
        document.title = state.meta.title ? `云音悦-${state.meta.title}` : '云音悦';
      }
      return '';
    },
  ],
});
