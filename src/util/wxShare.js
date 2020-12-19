import { getJSSDK,payorders,xcpayorders } from '@/api/wx';
import router from '../router'
// 朋友圈
// export default function wxShare() {
//     if (!isWeixinBrowser()) {
//         return;
//     }
//     loadShareSignature();
//     wx.ready(function () {
//         wx.getLocation({
//             type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
//             success: response => {
//                 // alert('地理位置获取成功',JSON.stringify(response))
//                 localStorage.setItem('latlon',JSON.stringify(response))
//             },
//             fail: err => {
//                 alert('获取位置失败', JSON.stringify(err))
//             },
//             cancel: err => {
//                 alert('用户拒绝授权获取地理位置', err)
//             }
//         })  
//     });
//     wx.error(p => {
//         console.log(p)
//     });
// }
const wxShare = () => {
    return new Promise((resolve, reject) => {
        if (!isWeixinBrowser()) {
            return;
        }
        // let shareSignature = JSON.parse(sessionStorage.shareSignature);
        // if(shareSignature){
        //     setShareConfig(shareSignature);
        //     resolve()
        //     return
        // }
    let url = encodeURIComponent(window.location.origin + router.currentRoute.fullPath)
    // if(sessionStorage.shareSignature){
    //     let jssdk = JSON.parse(sessionStorage.shareSignature)
    //     wx.config({
    //         debug: true,
    //         appId: 'wx2b58cb8bd7d7ceb1',
    //         timestamp: jssdk.timestamp,
    //         nonceStr: jssdk.nonceStr,
    //         signature: jssdk.signature,
    //         jsApiList: [
    //             'checkJsApi',
    //             'onMenuShareTimeline',
    //             'onMenuShareAppMessage',
    //             'getLocation',
    //             'hideMenuItems',
    //             'chooseWXPay']  
    //     });
    //     resolve()
    // }else{
        getJSSDK(url).then( data => {
            if(data){
                sessionStorage.shareSignature = JSON.stringify(data.data)
                let userInfo = JSON.parse(localStorage.getItem('userInfo'))
                // setShareConfig(data.data.data);
                // alert(data.data.data)
                debugger
                console.log('http://api.welaipay.com/#/?inviteCode='+userInfo.invite_code)
                wx.config({
                    debug: false,
                    appId: 'wx2b58cb8bd7d7ceb1',
                    timestamp: data.data.timestamp,
                    nonceStr: data.data.nonceStr,
                    signature: data.data.signature,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'getLocation',
                        'hideMenuItems',
                        'chooseWXPay']  
                });
                wx.onMenuShareTimeline({ 
                    link: 'http://api.welaipay.com/#/?inviteCode='+userInfo.invite_code,
                    title: '刚发现一个神器，用它去加油能打9折，不需要充值',
                    desc: '直接去加油站支付油费就可以，我刚加一次油便宜了几十',
                    imgUrl: 'https://shengxin-static.oss-cn-shenzhen.aliyuncs.com/images/vehicle/life/img-share-thumb.png',
                    success: function () {
                        // 设置成功
                        alert('分享成功')
                    }
                })
                wx.onMenuShareAppMessage({ 
                    link: 'http://api.welaipay.com/#/?inviteCode='+userInfo.invite_code,
                    title: '刚发现一个神器，用它去加油能打9折，不需要充值',
                    desc: '直接去加油站支付油费就可以，我刚加一次油便宜了几十',
                    imgUrl: 'https://shengxin-static.oss-cn-shenzhen.aliyuncs.com/images/vehicle/life/img-share-thumb.png',
                    success: function () {
                        // 设置成功
                        alert('分享成功')
                    }
                })
                resolve()
            }else if(data.data.code==401){
                localStorage.clear()
                sessionStorage.clear()
                window.location.reload()
            }else{
                alert(JSON.stringify(data))
            }
        })
    // }
    wx.error(p => {
            console.log(p)
        });
    })
}    
const loadShareSignature = () => {
    
    let url = window.location.origin + router.currentRoute.fullPath
    // alert('没有config')
    getJSSDK(url).then( data => {
        // alert('获取到了config'+data.data.code)
        console.log(111)
        if(data.data.code==0){
            sessionStorage.shareSignature = JSON.stringify(data.data.data)
            setShareConfig(data.data.data);
        }else if(data.data.code==401){
            localStorage.clear()
            sessionStorage.clear()
            window.location.reload()
        }else{
            alert(JSON.stringify(data))
        }
        
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
            'chooseWXPay']  
    });
    // wx.ready(function () {
        // wx.getLocation({
        //     type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        //     success: response => {
        //         // alert('地理位置获取成功',JSON.stringify(response))
        //         localStorage.setItem('latlon',JSON.stringify(response))
        //     },
        //     fail: err => {
        //         alert('获取位置失败1', JSON.stringify(err))
        //     },
        //     cancel: err => {
        //         alert('用户拒绝授权获取地理位置', err)
        //     }
        // })  
    // });
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