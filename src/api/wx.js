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
    return fet('carwash/web_route.php',params,'post')
}
export function wxPayConfig(id) {
    let params = {'prepay_id':id}
    return fet('api/user/wxPayConfig',params,'get')
}
export function getPayConfig(params) {
    return fet('public/wx/oil_wxpay.php',params,'post')
}
export function getxcPayConfig(params) {
    return fet('public/wx/car_wxpay.php',params,'post')
}