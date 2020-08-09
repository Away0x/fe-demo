import axios from '../../src'

// custom baseURL demo
const instance3 = axios.create({
  baseURL: 'https://img.mukewang.com/'
})

instance3.get('5cc01a7b0001a33718720632.gif')
instance3.get('https://img.mukewang.com/szimg/5becd5ad0001b89306000338-360-202.jpg')

// axios.all axios.spread axios.getUri demo
function getA() {
  return axios.get('/more/A')
}
function getB() {
  return axios.get('/more/B')
}

// 实际上，axios.all 就是 Promise.all 的封装，它返回的是一个 Promise 数组，
// then 函数的参数本应是一个参数为 Promise resolves（数组）的函数，
// 在这里使用了 axios.spread 方法。所以 axios.spread 方法是接收一个函数，
// 返回一个新的函数，新函数的结构满足 then 函数的参数结构
axios
  .all([getA(), getB()])
  .then(
    axios.spread(function(resA, resB) {
      console.log(resA.data)
      console.log(resB.data)
    })
  )
  .catch(console.warn)

axios
  .all([getA(), getB()])
  .then(([resA, resB]) => {
    console.log(resA.data)
    console.log(resB.data)
  })
  .catch(console.warn)

// getUri: 在不发送请求的前提下根据传入的配置返回一个 url
const fakeConfig = {
  baseURL: 'https://www.baidu.com',
  url: '/user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'thisIsATest'
  }
}

console.log('axios.getUri result: ', axios.getUri(fakeConfig))
