import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import login from '@/components/login.vue'
import register from '@/components/register.vue'
import trade from '@/components/trade.vue'
import publish from '@/components/publish.vue'

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
			path: '/trade',
			name: 'trade',
			component: trade
		},
		{
			path: '/publish',
			name: 'publish',
			component: publish
		},
  ]
})
