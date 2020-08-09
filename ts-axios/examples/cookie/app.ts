import axios from '../../src'

document.cookie = 'a=b;path=/'

// 当前域携带 cookie
axios
  .get('/more/get')
  .then(res => {
    console.log(res)
  })
  .catch(console.warn)

// 跨域携带 cookie
// 需要在 http://127.0.0.1:8088/ 域下先设置 cookie
axios
  .post(
    'http://127.0.0.1:8088/more/server2',
    {},
    {
      withCredentials: true
    }
  )
  .then(res => {
    console.log(res)
  })
  .catch(console.warn)
