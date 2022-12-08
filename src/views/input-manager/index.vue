<template>
	<div>
		<Table
			:data="list"
			:options="conf.options"
			:pageOptions="frontPageOptions"
			:loadingTag="loadingTag"
			:columns="conf.columns"
			@size-change="sizeChange"
			@handleCurrentChange="currentPageChange"
			@selection-change="onSelectionChange"
		>
			<template v-slot:status="data">
				<el-table-column :prop="data.status" :label="data.label">
					<template v-slot="{ row }">
						<el-tag type="danger">{{ row.status }}</el-tag>
					</template>
				</el-table-column>
			</template>
			<template v-slot:opts="data">
				<el-table-column
					:prop="data.opts"
					:label="data.label"
					:width="data.width"
				>
					<template v-slot>
						<el-button type="primary">编辑</el-button>
						<el-button type="danger">删除</el-button>
						<el-button type="success">提交审核</el-button>
					</template>
				</el-table-column>
			</template>
		</Table>
	</div>
</template>

<script>
import config from './index.data'
import { pager, crud } from '@/mixins'

export default {
	mixins: [pager, crud],
	data() {
		return {
			conf: config,
			list: [],
			loadingTag: 'tab1',
		}
	},

	methods: {
		// async getData() {
		// 	let params = {
		// ...this.getApiPager(),
		// name: '',
		// 	}
		// 	const [res, err] = await loanList(params, { loadingTag: this.loadingTag })
		// this.list = res?.data?.data
		// this.setTotal(res?.rows)
		// },

		onSelectionChange(e) {
			console.log(e, '===')
		},
		beforeInit() {
			this.url = '/loan/list'
			this.customField = { loadingTag: this.loadingTag }
			this.params = { ...this.getApiPager(), name: '' }
			return true
		},
	},
	created() {
		this.init()
	},
}
</script>

<style></style>
