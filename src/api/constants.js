import vm from '../main.js'
import axios from 'axios'
const qs = require('qs')
let that = vm;
const server = {
  development: 'http://car.welaipay.com/',
  production: 'http://car.welaipay.com/'
}

const jsonUrl = (json) => {
  let arr = []
  let str = ''
  for (let i in json) {
    str = i + '=' + json[i]
    arr.push(str)
  }
  return arr.join('&')
}

//写一个拦截器

export const fet = (url,data,method,postHeaders) => {
  // var oneToken = localStorage.getItem("oneToken");
  // if (oneToken && url!=='api/user/getOpenId') {
  //     axios.defaults.headers.common['authorization'] = oneToken
  // }
  let realUrl = server['development'] + url
  let type = method.toLowerCase()
  let res = {}
  if(type === 'get'){
    console.log(realUrl)
    res = axios.get(realUrl + '?' + jsonUrl(data))
    .catch(function (error) {
      alert(error)
    });
  } else if(type === 'post'){
    res = axios.post(realUrl,qs.stringify(data),postHeaders)
    .catch(function (error) {
      alert(error)
    })
  } else if(type === 'put') {
    res = axios.put(realUrl,qs.stringify(data),postHeaders)
    .catch(function (error) {
     
    })
  }
  return res
}
