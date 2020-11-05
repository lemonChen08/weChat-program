import  {fet} from './constants.js'

export function getJSSDK(jsurl) {
    let params = {'url':jsurl}
    return fet('api/user/wxConfig',params,'get')
}
export function getOpenid(params) {
    return fet('api/user/getOpenId',params,'post')
}
export function payorders(params) {
    return fet('api/gasStationOrder/create',params,'post',{headers:{'Content-Type':'application/json;charset=UTF-8'}})
}
export function xcpayorders(params) {
    return fet('api/carWashOrder/create',params,'post',{headers:{'Content-Type':'application/json;charset=UTF-8'}})
}
export function wxPayConfig(id) {
    let params = {'prepay_id':id}
    return fet('api/user/wxPayConfig',params,'get')
}