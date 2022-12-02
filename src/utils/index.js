import { secure } from '@/config'
import jwt_decode from 'jwt-decode'

export const checkLogin = () => {
	let token = getToken()
	if (!token) return null

	return jwt_decode(token, secure)
}

const getToken = () => {
	return window.sessionStorage.getItem('token')
}
