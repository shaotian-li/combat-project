<template>
	<FormCreate ref="createForm" :conf="config" @submit="create">
		<!-- <template #default>
			<div>
				<el-button type="primary" @click="create">创建表单</el-button>
				<el-button @click="reset">重置</el-button>
			</div>
		</template> -->
	</FormCreate>
</template>

<script>
import config from './config'
export default {
	data() {
		return {
			config,
		}
	},
	methods: {
		create() {
			this.$refs.createForm.validate((data) => {
				if (data) {
				} else {
					this.$message.error('验证失败')
				}
			})
		},
		reset() {
			this.$refs.createForm.reset()
		},
	},
}
</script>

<style></style>
