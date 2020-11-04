import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import register from '@/components/register.vue'
import publish from '@/components/publish.vue'
import center from '@/components/center.vue'  //个人中心
import jyorder from '@/components/jyorder.vue' //加油订单
import xcorder from '@/components/xcorder.vue' //洗车订单
import order_details from '@/components/order_details.vue' //订单详情
import xclist from '@/components/xclist.vue' //洗车列表
import xcdetails from '@/components/xcdetails.vue' //洗车详情
import home from '@/components/home.vue' //洗车详情
import jylist from '@/components/jylist.vue' //加油列表
import jydetail from '@/components/jydetail.vue' //加油详情
import lacation from '@/components/lacation.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
		{
		  path: '/',
		  name: 'home',
		  component: home
		},
		{
			path: '/register',
			name: 'register',
			component: register
		},
		{
			path: '/publish',
			name: 'publish',
			component: publish
		},
		{
			path: '/center',
			name: '个人中心',
			component: center
		},
		{
			path: '/jyorder',
			name: '加油订单列表',
			component: jyorder
		},
		{
			path: '/xcorder',
			name: '洗车订单列表',
			component: xcorder
		},
		{
			path: '/order_details',
			name: '订单详情',
			component: order_details
		},
		{
			path: '/xclist',
			name: '洗车列表',
			component: xclist
		},
		{
			path: '/xcdetails',
			name: '洗车详情',
			component: xcdetails
		},
		{
			path: '/jylist',
			name: 'jylist',
			component: jylist
		},
		{
			path: '/jydetail',
			name: 'jydetail',
			component: jydetail
		},
		{
			path: '/lacation',
			name: 'lacation',
			component: lacation
		},
  ]
})
