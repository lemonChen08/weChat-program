import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import login from '@/components/login.vue'
import register from '@/components/register.vue'
import publish from '@/components/publish.vue'

Vue.use(Router)

export default new Router({
  routes: [
		{
		  path: '/',
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
  ]
})
