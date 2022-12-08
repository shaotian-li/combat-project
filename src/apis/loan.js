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

export const saveLoan = (data) => {
	return pretty(
		request({
			url: '/loan/update',
			method: 'put',
			data: data,
		})
	)
}
// /loan/delete/:id
export const deleteLoan = (id) => {
	return pretty(
		request({
			url: '/loan/delete/' + id,
			method: 'delete',
		})
	)
}

// 提交
export const submitApprove = (id) => {
	return pretty(
		request({
			url: '/loan/submitToApprove',
			method: 'post',
			data: {
				id,
			},
		})
	)
}
/**
*  /approve/first/pass
  /approve/first/reject
  /approve/end/pass
  /approve/end/reject
loanId申请id
appId申请id
*/
function approveHandler(isFirst, isPass) {
	let param1 = isFirst ? 'first' : 'end'
	let param2 = isPass ? 'pass' : 'reject'
	let url = `/approve/${param1}/${param2}`
	return function (loanId) {
		return pretty(
			request({
				url: url,
				method: 'post',
				data: {
					loanId,
					appId: loanId,
				},
			})
		)
	}
}

export const approveFirstPass = approveHandler(1, 1),
	approveFirstReject = approveHandler(1, 0),
	approveEndPass = approveHandler(0, 1),
	approveEndReject = approveHandler(0, 0)

export const genContractFile = (id) => {
	return pretty(
		request({
			url: '/contract/createFile',
			method: 'post',
			data: {
				id,
			},
		})
	)
}

// 获取下载url
export const downloadContract = (id) =>
	pretty(
		request({
			url: '/contract/download',
			method: 'get',
			params: {
				id,
			},
		})
	)
