// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import layer from 'vue-layer'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import wxShare from './util/wxShare'

import App from './App'
import router from './router'
import wxAuth from './util/wxAuth.js'
const qs = require('qs')
Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$layer = layer(Vue);
Vue.prototype.$wxShare = wxShare


router.beforeEach((to, from, next) => {
  // debugger
  let token = localStorage.getItem('oneToken')
  // alert('token=='+token)
  if(token){
    wxShare().then(res=>{next()})
  }else{
    // wxAuth().then(res => {
    //   localStorage.setItem('userInfo',JSON.stringify(res.data.data))
    //   localStorage.setItem('oneToken',res.data.data.token)
    //   const url = window.location.href;
    //   const parseUrl = qs.parse(url.split('?')[1])
    //   const hasParse = JSON.stringify(qs) === '{}';
    //   const newUrl = `${url.split('?')[0]}${ hasParse ? `?${qs.stringify(parseUrl)}` : '' }`
    //   location.assign(newUrl)
    // })
    
  }
  // next()
})
// let vConsole = new VConsole()
// router.beforeEach((to, from, next) => {
//       let code = ''
//       var local = window.location.origin// 获取页面url
//       var appid = 'wx2b58cb8bd7d7ceb1' 
//       code = getUrlCode().code ||  localStorage.getItem('code') // 截取code
//       if (code == null || code === '') { // 如果没有code，则去请求
//           window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
//       } else {
//         const url = window.location.href;
//         const parseUrl = qs.parse(url.split('?')[1])
//         if(parseUrl.code){
//           localStorage.setItem('code',code)
//           delete parseUrl.code
//           delete parseUrl.state
//           qs.stringify(parseUrl)
//           var hasParse = JSON.stringify(qs) === '{}';
//           const newUrl = `${url.split('?')[0]}${ hasParse ? `?${qs.stringify(parseUrl)}` : '' }`
//           // location.assign(newUrl);
//         }
//         next()
//       }
//       next()
// })
// router.afterEach((to, from) => { 
//   // if(!localStorage.getItem('jsSdkConfig')){
//     let jsUrl = encodeURIComponent(window.location.origin + to.fullPath)
//     wxUtils(jsUrl).then(() => {})
//   // }
// })

// function getUrlCode() { // 截取url中的code方法
//       var url = location.search
//       var theRequest = new Object()
//       if (url.indexOf("?") != -1) {
//           var str = url.substr(1)
//           var strs = str.split("&")
//           for(var i = 0; i < strs.length; i ++) {
//               theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
//           }
//       }
//       return theRequest
//     }
/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render:h => h(App),
  mounted() {
    
    
  } 
})
export default vm