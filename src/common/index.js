import { Message, MessageBox } from 'element-ui'

function confirm(content) {
	return MessageBox.confirm(content, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			return true
		})
		.catch(() => {
			Message.error({
				type: 'info',
				message: '操作已取消',
			})
			return false
		})
}

function install(Vue) {
	Object.defineProperty(Vue.prototype, 'confirm', {
		set() {},
		get() {
			return confirm
		},
	})
}

export default {
	install,
}
