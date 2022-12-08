<template>
	<div>
		<Table
			:data="list"
			:options="conf.options"
			:pageOptions="frontPageOptions"
			:columns="conf.columns"
			@size-change="sizeChange"
			@handleCurrentChange="currentPageChange"
		>
			<template v-slot:birthday="data">
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
						<el-button type="primary">查看</el-button>
						<el-button type="danger">通过</el-button>
						<el-button type="success">拒绝</el-button>
					</template>
				</el-table-column>
			</template>
		</Table>
	</div>
</template>

<script>
import { pager, crud } from '@/mixins'
import config from './data'
export default {
	name: 'loan-first',
	mixins: [pager, crud],
	data() {
		return {
			conf: config,
			list: [],
			loadingTag: 'tab1',
		}
	},
	methods: {
		beforeInit() {
			this.url = '/approve/first/list'
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
