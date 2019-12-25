import React from 'react';
import { Redirect } from 'react-router-dom';

import Home from '@/pages/Home';
import Recommend from '@/pages/Recommend';
import Singers from '@/pages/Singers';
import Rank from '@/pages/Rank';
import Album from '@/pages/Album';
import Singer from '@/pages/Singer';

export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        key: "root",
        exact: true,
        render: () => (
          <Redirect to={"/recommend"} />
        )
      },
      {
        path: "/recommend/",
        key: "recommend",
        component: Recommend,
        routes: [
          {
            path: "/recommend/:id",
            key: "recommend/album",
            component: Album,
          }
        ]
      },
      {
        path: "/singers",
        key: "singers",
        component: Singers,
        routes: [
          {
            path: "/singers/:id",
            key: "singers/singer",
            component: Singer
          }
        ],
      },
      {
        path: "/rank",
        component: Rank,
        key: "rank",
        routes: [
          {
            path: "/rank/:id",
            key: "rank/album",
            component: Album
          }
        ]
      }
    ]
  }
]
