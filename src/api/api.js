import  {fet} from './constants.js'

const api = {}

api.userLogin = params => {
  return fet('api/user/login',params,'post')
}
api.bindPhone = params => {
  return fet('api/user/bindPhone',params,'post')
}
api.get_gaslist = params => {
  return fet('api/user/gasStations',params,'post')
}

api.get_station = params => {
  return fet('api/user/gasStationDetail',params,'get')
}
api.storesList = params => {
  return fet('api/user/stores',params,'post')
}
api.storesDetail = params => {
  return fet('api/user/stores',params,'get')
}
api.carWashPay = params => {
  return fet('api/carWashOrder/create',params,'post')
}
api.userinfo = params => {
  return fet('api/user/getOpenId',params,'post')
}
export {api}