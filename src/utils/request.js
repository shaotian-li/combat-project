import router from '@/router'
import Axios from 'axios'
import { Loading, Message, Notification } from 'element-ui'

export const request = Axios.create({
	baseURL: '/api',
})
let loadingInstance

// 实例做拦截器
request.interceptors.request.use(
	(config) => {
		const token = window.sessionStorage.getItem('token')
		loadingInstance = Loading.service({ fullscreen: true })
		if (token) {
			config.headers.token = token
		}
		return config
	},
	(err) => {
		Message.error(err.Message)
	}
)
request.interceptors.response.use(
	(response) => {
		loadingInstance.close()
		const token = response?.data?.data?.token
		if (token) {
			window.sessionStorage.setItem('token', token)
		}
		if (response?.data?.code === 20000) {
			return response.data.data
		} else if (response?.data?.code == 603) {
			Notification.error({
				title: '错误',
				message: response.data.data,
			})
			router.replace('/401')
		} else if (response?.data?.code == 401) {
			Notification.error({
				title: '错误',
				message: response.data.message,
			})
			router.replace('/401')
		} else {
			Message.error(response.data.message)
		}
	},
	(err) => {
		Message.error(err.Message)
	}
)

export const pretty = (promise) => {
	return promise
		.then((data) => {
			return [data, undefined]
		})
		.catch((err) => {
			return [undefined, err]
		})
}
