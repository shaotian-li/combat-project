import { Logout } from '@/apis/user'
import { Message } from 'element-ui'

export default {
	state: {
		isLogin: false,
		userInfo: null,
		userMenus: null,
	},
	getters: {
		getIsLogin(state) {
			return state.isLogin
		},
		getUserInfo(state) {
			return state.userInfo
		},
		getUserMenus(state) {
			return state.userMenus
		},
	},
	mutations: {
		changeIsLogin(state, payload) {
			state.isLogin = payload
		},
		changeUserInfo(state, payload) {
			state.userInfo = payload
		},
		changeUserMenus(state, payload) {
			state.userMenus = payload
		},
	},
	actions: {
		// Logout,
		async doLogout({ commit, dispatch }, payload) {
			let [res, err] = await Logout()
			if (err) {
				Message.error('退出失败')
			}
			commit('changeIsLogin', false)
			commit('changeUserInfo', null)
			commit('changeUserMenus', null)

			window.sessionStorage.setItem('token', '')
		},
	},
}
