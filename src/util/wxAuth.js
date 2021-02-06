import { getOpenid } from '@/api/wx';
const APPID = 'wxa912862c39071507';
// const APPID = 'wx584974b760e64957';
const WX_AUTH_URL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID
    + '&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=0#wechat_redirect';
/**
 * 微信授权
 */
export default function wxAuth() {
    return new Promise((resolve, reject) => {
        let code = getUrlParam('code')
        if (!code) {//未经过微信授权
            let currentUrl = encodeURIComponent(window.location.href);
            window.location.replace(WX_AUTH_URL.replace('REDIRECT_URI', currentUrl));
        } else {
            let param = {
                action: 'wx_user',
                code: code,
                invita_code:sessionStorage.getItem('inviteCode')
            }
            getOpenid(param).then(async res => {
                if (res.data.code == 200) {
                    resolve(res.data.data);
                } else if (res.data.code == 401) {
                    localStorage.clear()
                    sessionStorage.clear()
                    window.location.reload()
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
