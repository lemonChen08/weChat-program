// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import layer from 'vue-layer'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App'
import router from './router'

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$layer = layer(Vue);

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render:h => h(App),
  methods:{
        getCode () { // 非静默授权，第一次有弹框
          this.code = ''
          var local = window.location.origin// 获取页面url
          var appid = 'wx2b58cb8bd7d7ceb1' 
          this.code = this.getUrlCode().code // 截取code
          if (this.code == null || this.code === '') { // 如果没有code，则去请求
              window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
          } else {
              // 你自己的业务逻辑
          }
        },
        getUrlCode() { // 截取url中的code方法
          var url = location.search
          this.winUrl = url
          var theRequest = new Object()
          if (url.indexOf("?") != -1) {
              var str = url.substr(1)
              var strs = str.split("&")
              for(var i = 0; i < strs.length; i ++) {
                  theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
              }
          }
          return theRequest
        }
      },
      mounted() {
    //      this.getCode()
      }  
    
})
export default vm