import  {fet} from './constants.js'

const api = {}

// 获取一次性token
api.get_gaslist = params => {
  return fet('',params,'post')
}

export {api}