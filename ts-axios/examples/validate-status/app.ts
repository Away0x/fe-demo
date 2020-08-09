import axios from '../../src'

axios
  .get('/more/304')
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.warn(err.message)
  })

axios
  .get('/more/304', {
    validateStatus(status) {
      return status >= 200 && status < 400
    }
  })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.warn(err.message)
  })
