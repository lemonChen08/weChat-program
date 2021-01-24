import { getJSSDK} from '@/api/wx';
import router from '@/router'
const wxShare = () => {
    return new Promise((resolve, reject) => {
        if (!isWeixinBrowser()) {
            return;
        }
        let url = encodeURIComponent(window.location.origin + router.currentRoute.fullPath)
        getJSSDK(url).then(data => {
            if (data) {
                sessionStorage.shareSignature = JSON.stringify(data.data)
                let userInfo = JSON.parse(localStorage.getItem('userInfo'))
                wx.config({
                    debug: false,
                    appId: 'wx750dfbee1a08b602',
                    timestamp: data.data.timestamp,
                    nonceStr: data.data.nonceStr,
                    signature: data.data.signature,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'getLocation',
                        'hideMenuItems',
                        'chooseWXPay'
                    ]
                });
                wx.onMenuShareTimeline({
                    link: 'http://h5.chamiy.com/#/?inviteCode=' + userInfo.invite_code,
                    title: '刚发现一个神器，用它去加油能打9折，不需要充值',
                    desc: '直接去加油站支付油费就可以，我刚加一次油便宜了几十',
                    imgUrl: 'https://shengxin-static.oss-cn-shenzhen.aliyuncs.com/images/vehicle/life/img-share-thumb.png',
                    success: function () {}
                })
                wx.onMenuShareAppMessage({
                    link: 'http://h5.chamiy.com/#/?inviteCode=' + userInfo.invite_code,
                    title: '刚发现一个神器，用它去加油能打9折，不需要充值',
                    desc: '直接去加油站支付油费就可以，我刚加一次油便宜了几十',
                    imgUrl: 'https://shengxin-static.oss-cn-shenzhen.aliyuncs.com/images/vehicle/life/img-share-thumb.png',
                    success: function () {}
                })
                resolve()
            } else if (data && data.data.code == 401) {
                localStorage.clear()
                sessionStorage.clear()
                window.location.reload()
            } else {
                alert(JSON.stringify(data))
            }
        })
        wx.error(p => {
            console.log(p)
        });
    })
}

function setShareConfig(shareSignature) {
    wx.config({
        debug: false,
        appId: shareSignature.appId,
        timestamp: shareSignature.timestamp,
        nonceStr: shareSignature.nonceStr,
        signature: shareSignature.signature,
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'getLocation',
            'hideMenuItems',
            'chooseWXPay'
        ]
    });
}

function isWeixinBrowser() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        console.info('非微信浏览器');
        return false;
    }
}
export default wxShare;