const path = require('path');

const postCssPxtorem = require('postcss-pxtorem');
const LessPluginFunctions = require('less-plugin-functions');

module.exports = {
  alias: {
    '@': path.join(__dirname, 'src'),
  },
  env: {
    REACT_APP_BUILD_TIMESTAMP: (new Date()).getTime(),
    REACT_APP_VERSION: '1.0.1',
    REACT_APP_BRANCHE: 'master',
    REACT_APP_DESC: '',
  },
  postcss: {
    plugins: [
      postCssPxtorem({
        rootValue: 16,
        propList: ['*'],
      }),
    ],
  },
  less: {
    options: {
      modifyVars: {},
      javascriptEnabled: true,
      plugins: [
        new LessPluginFunctions(),
      ],
    },
  },
};
