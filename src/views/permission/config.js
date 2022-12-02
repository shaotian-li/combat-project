var validatePass = function (rule, value, callback) {
	// console.log(value, this.form, this.form.password, '======================')
	if (value === '') {
		callback(new Error('请再次输入密码'))
	} else if (value !== this.form.password) {
		callback(new Error('两次输入密码不一致!'))
	} else {
		callback()
	}
}

export default {
	// title: '这是表单',
	items: Object.freeze([
		[
			{
				type: 'input',
				label: '用户名',
				colspan: 12,
				key: 'username',
			},
		],
		[{ type: 'password', label: '密码', colspan: 12, key: 'password' }],
		[{ type: 'password', label: '确认密码', colspan: 12, key: 'confirmPwd' }],
		[
			{
				type: 'radio',
				label: '权限分配',
				colspan: 8,
				key: 'permission',
				value: '2',
				options: [
					{
						label: '2',
						text: '销售人员',
					},
					{
						label: '1',
						text: '初审人员',
					},
				],
			},
		],
	]),
	rules: {
		username: [{ required: true, message: '请输入用户名' }],
		password: [{ required: true, message: '请输入密码' }],
		confirmPwd: [{ validator: validatePass, trigger: 'blur' }],
		permission: [{ required: true }],
	},
}
