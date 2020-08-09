import axios from '../../src'

axios
  .post(
    '/more/post',
    {
      a: 1
    },
    {
      auth: {
        username: 'wt',
        password: '123456'
      }
    }
  )
  .then(res => {
    console.log('http auth success demo', res)
  })
  .catch(console.warn)

axios
  .post(
    '/more/post',
    {
      a: 1
    },
    {
      auth: {
        username: 'wt111',
        password: '123456'
      }
    }
  )
  .then(res => {
    console.log('http auth fail demo', res)
  })
  .catch(err => {
    console.log('http auth fail demo', err)
  })
