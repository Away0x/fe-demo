import axios from '../../src'

// 服务端
// app.use(
//   express.static(__dirname, {
//     setHeaders(res) {
//       res.cookie('XSRF-TOKEN-D', Math.random().toString(16).slice(2))
//     }
//   })
// )
const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance
  .get('/more/get')
  .then(res => {
    console.log('csrf demo:', res)
  })
  .catch(console.warn)
