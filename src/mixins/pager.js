export default {
	data() {
		return {
			pageSize: 10,
			total: 0,
			currentPage: 1,
			pageSizes: [10, 20, 30, 40],
		}
	},
	computed: {
		frontPageOptions() {
			return {
				pageSize: this.pageSize,
				total: this.total,
				currentPage: this.currentPage,
				pageSizes: this.pageSizes,
			}
		},
	},
	methods: {
		// 提供后端数据访问的参数
		getApiPager(page) {
			return {
				pageNo: this.currentPage,
				pageSize: this.pageSize,
			}
		},
		setTotal(total) {
			this.total = total
		},
		currentPageChange(page) {
			this.currentPage = page
			this.init()
		},

		sizeChange(size) {
			this.pageSize = size
			this.currentPage = 1
			this.init()
		},
	},
}
