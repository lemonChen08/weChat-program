import Vue from 'vue'
import Router from 'vue-router'

import publish from '@/components/publish.vue'
import jyorder from '@/components/jyorder.vue' //加油订单
import xcorder from '@/components/xcorder.vue' //洗车订单
import xcorder1 from '@/components/xcorder1.vue' //洗车订单
import order_details from '@/components/order_details.vue' //订单详情
import jyorder1 from '@/components/jyorder1.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'index',
			component: () => import('@/view/index/index.vue'),
			meta:{
				title:'吾福车生活'
			}
		},
		{
			path: '/mine',
			name: 'mine',
			component: () => import('@/view/mine/index.vue'),
			meta:{
				title:'个人中心'
			}
		},
		{
			path: '/xufei',
			name: 'xufei',
			component: () => import('@/view/member/xufei/index.vue'),
			meta:{
				title:'会员续费'
			}
		},
		{
			path: '/info',
			name: 'info',
			component: () => import('@/view/member/info/index.vue'),
			meta:{
				title:'会员信息'
			}
		},
		{
			path: '/jylist',
			name: 'jylist',
			component: () => import('@/view/jiayou/list/index.vue'),
			meta:{
				title:'加油'
			}
		},
		{
			path: '/jyDetail',
			name: 'jyDetail',
			component: () => import('@/view/jiayou/detail/index.vue'),
			meta:{
				title:'加油详情'
			}
		},
		{
			path: '/promote',
			name: 'promote',
			component: () => import('@/view/mine/promote/index.vue'),
			meta:{
				title:'我的推广'
			}
		},
		{
			path: '/teamStats',
			name: 'teamStats',
			component: () => import('@/view/mine/teamStats/index.vue'),
			meta:{
				title:'团队统计'
			}
		},
		{
			path: '/nextMember',
			name: 'nextMember',
			component: () => import('@/view/mine/nextMember/index.vue'),
			meta:{
				title:'下级会员'
			}
		},
		{
			path: '/xcList',
			name: 'xcList',
			component: () => import('@/view/xiche/list/index.vue'),
			meta:{
				title:'洗车保养'
			}
		},
		{
			path: '/xcdetails',
			name: 'xcdetails',
			component: () => import('@/view/xiche/detail/index.vue'),
			meta:{
				title:'洗车保养'
			}
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
			path: '/jyorder1',
			name: 'jyorder1',
			component: jyorder1
		}
	]
})
