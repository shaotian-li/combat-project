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
			<template v-slot:birthday="data">
				<el-table-column :prop="data.status" :label="data.label">
					<template v-slot="{ row }">
						<span>{{ row.birthday | birthday }}</span>
					</template>
				</el-table-column>
			</template>

			<template v-slot:status="data">
				<el-table-column :prop="data.status" :label="data.label">
					<template v-slot="{ row }">
						<el-tag type="danger">{{ row.status }}</el-tag>
					</template>
				</el-table-column>
			</template>

			<!-- birthday -->
			<template v-slot:opts="data">
				<el-table-column
					:prop="data.opts"
					:label="data.label"
					:width="data.width"
				>
					<template v-slot="{ row }">
						<el-button @click="showEdit(row)" type="primary">编辑</el-button>
						<el-button @click="handleDelete(row.id)" type="danger"
							>删除</el-button
						>
						<el-button @click="submit" type="success">提交审核</el-button>
					</template>
				</el-table-column>
			</template>
		</Table>

		<el-dialog
			title="申请管理-编辑"
			@open="exist = true"
			@closed="exist = false"
			:visible.sync="dialogVisible"
			width="30%"
		>
			<FormCreate
				:key="Math.random()"
				@submit="save"
				:conf="editConf"
			></FormCreate>
		</el-dialog>
	</div>
</template>

<script>
import config from './index.data'
import { pager, crud } from '@/mixins'
import { deleteLoan, submitApprove, saveLoan } from '@/apis/loan'
import { sexOptions } from './index.data'

export default {
	name: 'input-manager',
	mixins: [pager, crud],
	data() {
		return {
			conf: config,
			list: [],
			loadingTag: 'tab1',
			dialogVisible: false,
			editConf: {},
			exist: false,
			id: '',
		}
	},

	methods: {
		onSelectionChange(e) {
			console.log(e, '===')
		},
		beforeInit() {
			this.url = '/loan/list'
			this.customField = { loadingTag: this.loadingTag }
			this.params = { ...this.getApiPager(), name: '' }
			return true
		},

		// 删除
		async handleDelete(id) {
			let isConfirm = await this.confirm('是否确认删除？')
			if (!isConfirm) return
			let [res, err] = await deleteLoan(id)
			this.$message.success('删除成功')
			this.init()
		},
		async submit(id) {
			let isConfirm = await this.confirm('是否确认提交？')
			if (!isConfirm) return
			let [res, err] = await submitApprove(id)
			this.$message.success('审核成功')
			this.init()
		},

		async save(data) {
			let [res, err] = await saveLoan({ ...data, id: this.id })
			this.dialogVisible = false
		},

		showEdit(data) {
			this.id = data.id
			this.editConf = {
				items: [
					[
						{
							label: '姓名',
							value: data.name,
							type: 'input',
							key: 'name',
							colspan: 20,
						},
					],
					[
						{
							label: '性别',
							value: data.sex,
							options: sexOptions,
							key: 'sex',
							type: 'select',
							colspan: 20,
						},
					],
				],
				rules: {
					name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
					sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
				},
			}
			this.dialogVisible = true
		},
	},
	created() {
		this.init()
	},
}
</script>

<style></style>
