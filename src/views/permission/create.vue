<template>
	<div>
		<FormCreate ref="createForm" :conf="config">
			<template #default>
				<div>
					<el-button type="primary" @click="create">创建表单</el-button>
					<el-button @click="reset">重置</el-button>
				</div>
			</template>
		</FormCreate>
	</div>
</template>

<script>
import config from './config'
import { createUser } from '@/apis/user'

export default {
	name: 'create',
	data() {
		return {
			config,
		}
	},
	methods: {
		create() {
			this.$refs.createForm.validate(async (data) => {
				if (data) {
					const { password, permission, username } = data
					let params = {
						account: username,
						password,
						role_id: permission,
					}
					let [res, err] = await createUser(params)
					if (err) {
						this.$message.error(res)
					}
					this.$message.success(res)
					console.log(res)
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
