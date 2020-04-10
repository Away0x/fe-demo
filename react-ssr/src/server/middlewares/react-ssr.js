import React from 'react';
import { renderToString } from 'react-dom/server';

import Index from '../../client/pages/index';

export default (ctx, next) => {
  console.log('ctx.request.path', ctx.request.path);
  console.log('ctx.request.url', ctx.request.url);

  const html = renderToString(<Index />);

  ctx.body = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>my react ssr</title>
    </head>
    <body>
        <div id="root">
          ${html} <span>测试内容</span>
        </div>
    </body>
    </html><script type="text/javascript" src="index.js"></script>
  `;

  return next();
}
