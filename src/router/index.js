import Vue from 'vue'
import Router from 'vue-router'

import publish from '@/components/publish.vue'
import jyorder from '@/components/jyorder.vue' //加油订单
import xcorder from '@/components/xcorder.vue' //洗车订单
import xcorder1 from '@/components/xcorder1.vue' //洗车订单
import order_details from '@/components/order_details.vue' //订单详情
import lacation from '@/components/lacation.vue'
import jyorder1 from '@/components/jyorder1.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'index',
			component: () => import('@/view/index/index.vue')
		},
		{
			path: '/mine',
			name: '个人中心',
			component: () => import('@/view/mine/index.vue')
		},
		{
			path: '/xufei',
			name: '会员续费',
			component: () => import('@/view/member/xufei/index.vue')
		},
		{
			path: '/info',
			name: '会员信息',
			component: () => import('@/view/member/info/index.vue')
		},
		{
			path: '/jylist',
			name: '加油',
			component: () => import('@/view/jiayou/list/index.vue')
		},
		{
			path: '/jyDetail',
			name: '加油',
			component: () => import('@/view/jiayou/detail/index.vue')
		},
		{
			path: '/promote',
			name: '我的推广',
			component: () => import('@/view/mine/promote/index.vue')
		},
		{
			path: '/teamStats',
			name: '我的推广',
			component: () => import('@/view/mine/teamStats/index.vue')
		},
		{
			path: '/nextMember',
			name: '下级会员',
			component: () => import('@/view/mine/nextMember/index.vue')
		},
		{
			path: '/xcList',
			name: '洗车保养',
			component: () => import('@/view/xiche/list/index.vue')
		},
		{
			path: '/xcdetails',
			name: '洗车保养',
			component: () => import('@/view/xiche/detail/index.vue')
		},
		{
			path: '/publish',
			name: 'publish',
			component: publish
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
			path: '/xcorder1',
			name: 'xcorder1',
			component: xcorder1
		},
		{
			path: '/order_details',
			name: '订单详情',
			component: order_details
		},
		{
			path: '/lacation',
			name: 'lacation',
			component: lacation
		},
		{
			path: '/jyorder1',
			name: 'jyorder1',
			component: jyorder1
		}
	]
})
