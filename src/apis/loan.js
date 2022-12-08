import { request, pretty } from '@/utils/request'

// 贷款申请
export const loanCreate = (params) => {
	return pretty(request.post('/loan/create', params))
}
//申请管理
export const loanList = (params, customField) => {
	return pretty(
		request({
			url: '/loan/list',
			params,
			...customField,
		})
	)
}
