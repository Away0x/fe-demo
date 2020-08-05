import axios, { AxiosTransformer } from '../../src'
import qs from 'qs'

axios.defaults.headers.common['test2'] = 123

axios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({ a: 1 }),
  headers: {
    test: '3210'
  }
})
  .then(res => {
    console.log(res.data)
  })
  .catch(e => console.warn(e))
