import React from 'react';
import { Redirect } from 'react-router-dom';

import Home from '@/pages/Home';
import Recommend from '@/pages/Recommend';
import Singers from '@/pages/Singers';
import Rank from '@/pages/Rank';
import Album from '@/pages/Album';

export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => (
          <Redirect to={"/recommend"} />
        )
      },
      {
        path: "/recommend/",
        component: Recommend,
        routes: [
          {
            path: "/recommend/:id",
            component: Album,
          }
        ]
      },
      {
        path: "/singers",
        component: Singers
      },
      {
        path: "/rank",
        component: Rank
      }
    ]
  }
]
