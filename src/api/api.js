import  {fet} from './constants.js'

const api = {}

api.userLogin = params => {
  return fet('api/user/login',params,'post')
}
api.bindPhone = params => {
  return fet('station/web_route.php',params,'post')
}
api.get_gaslist = params => {
  return fet('station/web_route.php',params,'post')
}

api.get_station = params => {
  return fet('station/web_route.php',params,'post')
}
api.storesList = params => {
  return fet('carwash/web_route.php',params,'post')
}
api.storesDetail = params => {
  return fet('carwash/web_route.php',params,'post')
}
// api.carWashPay = params => {
//   return fet('api/carWashOrder/create',params,'post',{headers:{'Content-Type':'application/json;charset=UTF-8'}})
// }
api.userinfo = params => {
  return fet('station/web_route.php',params,'post')
}
api.getorder = params => {
  return fet('station/web_route.php',params,'get')
}
export {api}