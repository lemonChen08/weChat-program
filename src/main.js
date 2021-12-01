// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import layer from 'vue-layer';
import ElementUI from 'element-ui';
import wxShare from '@/util/wxShare'

import App from '@/App'
import store from '@/store'
import router from '@/router'
import wxAuth from '@/util/wxAuth'
import {Swipe,Lazyload,SwipeItem,Icon,RadioGroup, Radio, Tab, Tabs,Toast} from 'vant'
const qs = require('qs')
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Icon)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Toast)

Vue.config.productionTip = false
Vue.prototype.$layer = layer(Vue);

router.beforeEach((to, from, next) => {
  if(to.meta.title){
    document.title = to.meta.title
  }
  if(to.query.inviteCode){
    sessionStorage.setItem('inviteCode',to.query.inviteCode)
  }
  let token = localStorage.getItem('userInfo')
  token = JSON.parse(token)
  if(token && token.wx_id){
    wxShare().then(res=>{next()})
  }else{
    wxAuth().then(res => {
      localStorage.setItem('userInfo',JSON.stringify(res))
      const url = window.location.href;
      const parseUrl = qs.parse(url.split('?')[1])
      const hasParse = JSON.stringify(qs) === '{}';
      const newUrl = `${url.split('?')[0]}${ hasParse ? `?${qs.stringify(parseUrl)}` : '' }`
      location.assign(newUrl)
    })
    
  }
})
new Vue({
  el: '#app',
  router,
  store,
  render:h => h(App)
})