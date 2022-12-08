import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import Axios from 'axios'
import { Whitelist } from '@/config'
import { checkLogin } from '@/utils/index'
import { pretty } from '@/utils/request'
import Home from '../views/Home.vue'
import Layout from '@/layouts/Layout.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/home',
		name: 'home',
		component: Layout,
		meta: {
			title: '首页',
		},
		children: [
			{
				path: '/home',
				component: Home,
			},
		],
	},
	{
		path: '/404',
		name: 'notFound',
		component: () => import('../views/404.vue'),
	},
	{
		path: '/401',
		name: 'Reject',
		component: () => import('../views/401.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue'),
	},
]

const router = new VueRouter({
	routes,
})

const asyncRoutesHandler = (routes) => {
	return routes.map((r) => {
		if (r.component === 'Layout') {
			r.component = Layout
		} else {
			let filePath = r.component
			r.component = () => import(`../views/${filePath}.vue`)
		}
		if (r.children) {
			r.children = asyncRoutesHandler(r.children)
		}
		return r
	})
}

const loadMenus = async (next, to) => {
	let [res, err] = await pretty(Axios.get('/menus.json'))
	if (err) {
		throw new Error(err.message)
	}

	let asyncRoutes = asyncRoutesHandler(res.data)

	// *优先级最高 要把404 放到最后
	asyncRoutes.push({
		path: '*',
		redirect: { name: 'notFound' },
	})
	asyncRoutes.forEach((r) => {
		router.addRoute(r)
	})

	// 保存用户菜单 生成左侧菜单栏
	store.commit('user/changeUserMenus', res.data)
	console.log(to, '=====')
	next({ ...to, replace: true })
}

router.beforeEach((to, form, next) => {
	// console.log(to, 'form', form)
	// 登陆页面 注册页面 => 白名单 直接放行
	if (Whitelist.includes(to.path)) {
		return next()
	}
	let userInfo = checkLogin()
	if (userInfo) {
		// 刷新页面 vuex数据没有
		// 用户数据
		if (!store.getters['user/getUserInfo']) {
			store.commit('user/changeUserInfo', {
				username: userInfo.account,
			})
			store.commit('user/changeIsLogin', true)
		}
		// 刷新导致路由没有了 动态菜单
		if (!store.getters['user/getUserMenus']) {
			loadMenus(next, to)
		} else {
			if (to.name) {
				store.commit('user/addTag', {
					title: to?.meta?.title,
					compName: to.name,
				})
			}
			next() // 有菜单
		}
	} else {
		// 如果没有登陆 让登陆页面 然后直接返回地址栏地址
		next('/login?redirect=' + to.path)
	}
})
export default router
