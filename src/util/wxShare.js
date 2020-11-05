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
        loadShareSignature();
        wx.ready(function () {
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: response => {
                    // alert('地理位置获取成功',JSON.stringify(response))
                    localStorage.setItem('latlon',JSON.stringify(response))
                    resolve()
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
    })
}    
function loadShareSignature() {
    
    if (sessionStorage.shareSignature) {
        // alert('有config')
        let shareSignature = JSON.parse(sessionStorage.shareSignature);
        setShareConfig(shareSignature);
        return;
    }
    let url = window.location.origin + router.currentRoute.fullPath
    // alert('没有config')
    getJSSDK(url).then(async data => {
        // alert('获取到了config'+data.data.code)
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