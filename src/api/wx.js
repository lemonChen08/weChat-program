import  {fet} from './constants.js'

export function getJSSDK(jsurl) {
    let params = {'Type':'config','url':jsurl}
    return fet('public/GetWX.php',params,'get')
}
export function getOpenid(params) {
    return fet('station/web_route.php',params,'post')
}
export function payorders(params) {
    return fet('station/web_route.php',params,'post')
}
export function xcpayorders(params) {
    return fet('api/carWashOrder/create',params,'post',{headers:{'Content-Type':'application/json;charset=UTF-8'}})
}
export function wxPayConfig(id) {
    let params = {'prepay_id':id}
    return fet('api/user/wxPayConfig',params,'get')
}