import  {fet} from './constants.js'

export function getJSSDK(jsurl) {
    let params = {'url':jsurl}
    return fet('api/user/wxConfig',params,'get')
}
export function payorders(params) {
    return fet('api/gasStationOrder/create',params,'post',{headers:{'Content-Type':'application/json;charset=UTF-8'}})
}