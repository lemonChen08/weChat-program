import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import login from '@/components/login.vue'
import register from '@/components/register.vue'
import publish from '@/components/publish.vue'
import center from '@/components/center.vue'
import jyorder from '@/components/jyorder.vue'
import xcorder from '@/components/xcorder.vue'
import order_details from '@/components/order_details.vue'
import xclist from '@/components/xclist.vue'
import xcdetails from '@/components/xcdetails.vue'

Vue.use(Router)

export default new Router({
  routes: [
		{
		  path: '/login',
		  name: 'login',
		  component: login
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
			path: '/',
			name: '洗车列表',
			component: xclist
		},
		{
			path: '/xcdetails',
			name: '洗车详情',
			component: xcdetails
		},
  ]
})
