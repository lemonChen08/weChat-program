import { getJSSDK,payorders,xcpayorders } from '@/api/wx';

// 朋友圈
export default function wxShare() {
    if (!isWeixinBrowser()) {
        return;
    }
    loadShareSignature();
    wx.ready(function () {
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: response => {
                alert('地理位置获取成功',JSON.stringify(response))
                localStorage.setItem('latlon',JSON.stringify(response))
            },
            fail: err => {
                alert('获取位置失败', JSON.stringify(err))
            },
            cancel: err => {
                alert('用户拒绝授权获取地理位置', err)
            }
        })  
    });
    wx.error(p => {
        console.log(p)
    });
}

function loadShareSignature() {
    if (sessionStorage.shareSignature) {
        let shareSignature = JSON.parse(sessionStorage.shareSignature);
        setShareConfig(shareSignature);
        return;
    }
    let url = location.origin
    getJSSDK(url).then(async data => {
        if(data.data.code==0){
            sessionStorage.shareSignature = JSON.stringify(data.data.data)
            setShareConfig(data.data.data);
        }
    })
}

function setShareConfig(shareSignature) {
    wx.config({
        debug: true,
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
            'chooseWXPay']
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
