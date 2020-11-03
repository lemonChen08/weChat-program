import vm from '../main.js'
import axios from 'axios'
const qs = require('qs')
let that = vm;
const server = {
  development: 'http://118.89.239.14:8108/',
  production: 'http://118.89.239.14:8108/'
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
  var oneToken = localStorage.getItem("oneToken");
  if (oneToken) {
      axios.defaults.headers.common['authorization'] = oneToken
  }
  let realUrl = server['development'] + url
  let type = method.toLowerCase()
  let res = {}
  if(type === 'get'){
    res = axios.get(realUrl + '?' + jsonUrl(data))
    .catch(function (error) {
      
    });
  } else if(type === 'post'){
    if(url=='api/gasStationOrder/create' || url=='api/carWashOrder/create'){
      res = axios.post(realUrl,data,postHeaders)
    }else{
      res = axios.post(realUrl,qs.stringify(data),postHeaders)
    }
  } else if(type === 'put') {
    res = axios.put(realUrl,qs.stringify(data),postHeaders)
    .catch(function (error) {
     
    })
  }
  return res
}
