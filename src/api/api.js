import  {fet} from './constants.js'

const api = {}

// 获取一次性token
api.userLogin = params => {
  return fet('',params,'post')
}
// 注册
api.register = params => {
  return fet('/api/user/v1/register',params,'post')
}
// 登录
api.login = params => {
  return fet('/api/user/v1/login',params,'post')
}
// 发送手机验证码
api.sendPhoneCode = params => {
  return fet('/api/user/v1/sendPhone',params,'post')
}

export {api}