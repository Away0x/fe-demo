import React from 'react';
import ReactDom from 'react-dom';
import Index from '../pages/index';

//渲染index 组件
ReactDom.hydrate(<Index />, document.getElementById('root'))
