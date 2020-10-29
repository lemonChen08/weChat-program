import  {fet} from './constants.js'

export function getJSSDK(params) {
    return fet('/wechat/auth',params,'get')
}