const path = require('path')

module.exports = {
  entry: 'src/main',
  alias: {
    '@': path.join(__dirname, 'src'),
  },
}
