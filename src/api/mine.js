import { fet } from '@/api/constants.js'

export function getUserInfo(params){
    return fet('station/web_route.php', params, 'post')
}

export function memberPay(params){
    return fet('public/wx/member_wxpay.php',params,'post')
}