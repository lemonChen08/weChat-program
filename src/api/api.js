import { fet } from '@/api/constants.js'

const api = {}

api.userLogin = params => {
  return fet('api/user/login', params, 'post')
}
api.bindPhone = params => {
  return fet('station/web_route.php', params, 'post')
}
api.get_gaslist = params => {
  return fet('station/web_route.php', params, 'post')
}

api.get_station = params => {
  return fet('station/web_route.php', params, 'post')
}
api.storesList = params => {
  return fet('carwash/web_route.php', params, 'post')
}
api.storesDetail = params => {
  return fet('carwash/web_route.php', params, 'post')
}
api.userinfo = params => {
  return fet('station/web_route.php', params, 'post')
}
api.getorder = params => {
  return fet('station/web_route.php', params, 'post')
}
api.getxcorder = params => {
  return fet('carwash/web_route.php', params, 'post')
}
api.getinvitelist = params => {
  return fet('station/web_route.php', params, 'post')
}
export { api }