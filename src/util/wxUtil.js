// import wx from "weixin-jsapi";
const wx = window.wx
import { sha256 } from 'js-sha256'
 
 
import { getJSSDK,payorders,xcpayorders } from '@/api/wx';//获取appid信息的接口,以后台人员接口为准
// import { payorders } from "@/api/appointment";//一个更具订单id获取appid的接口

const wxUtils = (jsurl) => {
  return new Promise((resolve, reject) => {
    getJSSDK(jsurl).then(async data => {
      if(data.data.code==0){
        localStorage.setItem('jsSdkConfig',data.data.data)
      }
      await wx.config({
        debug: true, // TODO: 测试阶段使用
        appId: data.data.data.appId,
        timestamp: data.data.data.timestamp,
        nonceStr: data.data.data.nonceStr,
        signature: data.data.data.signature,
        jsApiList: [
          'getLocation',
          'hideMenuItems',
          'chooseWXPay'
        ]
      });
      // wx.getLocation({
      //   type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      //   success: response => {
      //     alert('地理位置获取成功',JSON.stringify(response))
      //     localStorage.setItem('latlon',JSON.stringify(response))
      //   },
      //   fail: err => {
      //     alert('获取位置失败', JSON.stringify(err))
      //   },
      //   cancel: err => {
      //     alert('用户拒绝授权获取地理位置', err)
      //   }
      // })  
      wxReady(resolve)
    })
  })
}
// 微信jssdk加载完成
const wxReady = resolve => {  //不让分享
  wx.ready(() => {
    wx.hideMenuItems({
      menuList: [
        'menuItem:share:timeline', // 分享给朋友圈
        'menuItem:share:qq', // 分享到QQ
        'menuItem:share:weiboApp', // 分享到Weibo
        'menuItem:favorite', // 收藏
        'menuItem:share:QZone', // 分享到 QQ 空间
        'menuItem:copyUrl', // 复制链接
        'menuItem:openWithQQBrowser', // 在QQ浏览器中打开
        'menuItem:openWithSafari', // 在Safari中打开
        'menuItem:share:email', // 邮件
        'menuItem:readMode', // 阅读模式
        'menuItem:originPage' // 原网页
      ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    });
    resolve();
  });
};
// 微信支付
const WXinvoke = (data, resolve) => {  //orderId 订单ID
  payorders(data).then(res => {
    let payData = {
      // "appId": res.data.data.appid, // 公众号名称，由商户传入
      "timestamp": parseInt(new Date().getTime() / 1000).toString(), // 时间戳，自1970年以来的秒数
      "nonceStr": res.data.data.nonce_str, // 随机串
      "package": "prepay_id=" + res.data.data.prepay_id,
      "signType": 'HMAC-SHA256', // 微信签名方式：
    }
    payData.paySign = createSign(payData);
    // alert("package==="+payData.package)
      wx.chooseWXPay(
        'getBrandWCPayRequest',payData ,
        function (res) {
          console.log(res)
          setTimeout(function () {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              resolve()
            }
          }, 500);
        }
      )
  });
}
const xcWXinvoke = (data, resolve) => {  //orderId 订单ID
  xcpayorders(data).then(res => {
    let payData = {
      "appId": res.data.data.appid, // 公众号名称，由商户传入
      "timeStamp": parseInt(new Date().getTime() / 1000).toString(), // 时间戳，自1970年以来的秒数
      "nonceStr": res.data.data.nonce_str, // 随机串
      "package": "prepay_id=" + res.data.data.prepay_id,
      "signType": 'HMAC-SHA256', // 微信签名方式：
    }
    payData.paySign = createSign(payData);
      wx.chooseWXPay(
        'getBrandWCPayRequest',payData ,
        function (res) {
          console.log(res)
          setTimeout(function () {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              resolve()
            }
          }, 500);
        }
      )
  });
}
// 生成签名
function createSign(data) {
  var stringA;
  var array = [];
  for (var obj in data) {
      array.push(obj + "=" + data[obj]);
  }
  stringA = array.join("&") + "&key=" + 'e3fe67e0ff6080f5272736db75ba8532';
  let paySign = sha256(stringA).toUpperCase()
  return paySign;
}
const getLocation = () => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: response => {
        // alert('地址拿到了')
        resolve(response);
      },
      fail: err => {
        alert('获取位置失败', JSON.stringify(err))
      },
      cancel: err => {
        alert('用户拒绝授权获取地理位置', err)
      }
    });
  });
};
export { getLocation,WXinvoke,xcWXinvoke };
export default wxUtils;
