import React, { memo } from 'react';

import './LoadingV2.module.less';

const LoadingV2 = memo(() => {
  return (
    <div className="loadingv2-component">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <span> 拼命加载中...</span>
    </div>
  );
});

export default LoadingV2;
