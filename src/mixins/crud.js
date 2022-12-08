import { request, pretty } from '@/utils/request'

export default {
	methods: {
		beforeInit() {
			return false
		},

		// 数据初始化
		async init() {
			console.log('进来', this.beforeInit())

			if (!(await this.beforeInit())) {
				return
			}
			let [res, err] = await pretty(
				request({
					url: this.url,
					...this.customField,
					params: this.params,
				})
			)
			if (err) return this.$message.error('请求失败')
			this.list = res?.data?.data
			this.setTotal(res?.rows)
		},
	},
}
