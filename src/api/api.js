import  {fet} from './constants.js'

const api = {}

api.userLogin = params => {
  return fet('user/login',params,'post')
}

api.get_gaslist = params => {
  return fet('user/gasStations',params,'post')
}

api.get_station = params => {
  return fet('user/gasStationDetail',params,'get')
}
export {api}