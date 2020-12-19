import { getOpenid } from '@/api/wx';
import cookie from './cookie'
const APPID = 'wx2b58cb8bd7d7ceb1';
// const APPID = 'wx584974b760e64957';
const WX_AUTH_URL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID
    + '&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_base&state=0#wechat_redirect';

/**
 * 微信授权
 */
export default function wxAuth() {
    return new Promise((resolve, reject) => {
        // let openid = cookie.get('openid');
        // if (openid) {
        //     resolve(openid);
        //     return;
        // }
        let code = getUrlParam('code');
        if (!code) {//未经过微信授权
            // alert('没有code')
            let currentUrl = encodeURIComponent(window.location.href);
            window.location.replace(WX_AUTH_URL.replace('REDIRECT_URI', currentUrl));
        } else {
            // alert('有code')
            let param = {
                action:'wx_user',
                code:code,
                invita_code:getUrlCode().inviteCode
            }
            getOpenid(param).then(async res => {
                // alert('获取到了openid？'+res.data.code)
                if(res.data.code==200){
                    console.log("微信授权完成");
                    resolve(res.data.data);
                }else if(res.data.code==401){
                    localStorage.clear()
                    sessionStorage.clear()
                    window.location.reload()
                }else{
                    alert(JSON.stringify(res))
                }
            })
        }
    });
}
function getUrlParam(key) {//获取当前页面url中的参数
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : '';
}
function getUrlCode() { // 截取url中的code方法
      var url = location.search
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
