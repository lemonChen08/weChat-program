// import wx from "weixin-jsapi";
const wx = window.wx
 
 
import { getJSSDK,payorders } from '@/api/wx';//获取appid信息的接口,以后台人员接口为准
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
          'hideMenuItems'
        ]
      });
      // wx.getLocation({
      //   type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      //   success: response => {
      //     console.log('地理位置获取成功',response)
      //     localStorage.setItem('latlon',JSON.stringify(response))
      //   },
      //   fail: err => {
      //     console.log('获取位置失败', JSON.stringify(err))
      //   },
      //   cancel: err => {
      //     console.log('用户拒绝授权获取地理位置', err)
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
    wx.chooseWXPay(
      'getBrandWCPayRequest', {
        "appId": res.data.data.appid, // 公众号名称，由商户传入
        "timeStamp": res.data.data.timestamp, // 时间戳，自1970年以来的秒数
        "nonceStr": res.data.data.nonce_str, // 随机串
        "package": res.data.data.package,
        "signType": res.data.data.sign, // 微信签名方式：
        "paySign": res.data.data.signature // 微信签名
      },
      function (res) {
        setTimeout(function () {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            resolve()
          }
        }, 500);
      }
    );
  });
}
const getLocation = () => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: response => {
        resolve(response);
      },
      fail: err => {
        reject(err);
      }
    });
  });
};
export { getLocation,WXinvoke };
export default wxUtils;
