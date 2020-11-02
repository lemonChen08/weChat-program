import  {fet} from './constants.js'
import router from '../router'

export function getJSSDK(jsurl) {
    let  url = `http://${window.location.href}`
    // router.afterEach((to, from) => {
    //     url = `https://${window.location.host}${to.fullPath}`
    // })
    let params = {'url':jsurl}
    return fet('api/user/wxConfig',params,'get')
}