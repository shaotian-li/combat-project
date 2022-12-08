<template>
	<FormCreate ref="createForm" :conf="config" @submit="create"> </FormCreate>
</template>

<script>
import config from './config'
import { loanCreate } from '@/apis/loan'
export default {
	data() {
		return {
			config,
		}
	},
	methods: {
		create() {
			this.$refs.createForm.validate(async (data) => {
				if (data) {
					const {
						name,
						birthday,
						identity_card,
						sex,
						marriage,
						education,
						address1,
						address2,
						phone,
						mobile_phone,
						company,
						trade,
						position,
						address3,
						company_type,
						company_email,
						company_phone,
						income,
						contact,
						contact_name,
						contact_phone,
						contact2,
						contact2_name,
						contact2_phone,
						contact2_dep,
						contact2_pos,
						remark,
					} = data
					let params = {
						name,
						birthday,
						identity_card,
						sex,
						marriage,
						education,
						address1,
						address2,
						phone,
						mobile_phone,
						company,
						trade,
						position,
						address3,
						company_type,
						company_email,
						company_phone,
						income,
						contact,
						contact_name,
						contact_phone,
						contact2,
						contact2_name,
						contact2_phone,
						contact2_dep,
						contact2_pos,
						remark,
					}

					let [res, err] = await loanCreate(params)
					if (err) return this.$message.error('表单验证失败')
					if (res) {
						this.$message.success(res)
					}
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
