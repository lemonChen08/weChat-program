import  {fet} from './constants.js'

const api = {}

api.get_gaslist = params => {
  return fet('',params,'post')
}

api.get_station = params => {
  return fet('',params,'post')
}
export {api}