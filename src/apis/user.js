import { request, pretty } from '@/utils/request'
export const Login = (params) => {
	return pretty(request.post('/user/login', params))
}
export const Logout = () => {
	return pretty(request.post('/user/logout'))
}

// 创建管理员
export const createUser = (params) => {
	return pretty(request.post('/permission/createUser', params))
}
