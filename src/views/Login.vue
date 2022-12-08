<template>
	<div class="login-box">
		<div class="login-input-box center">
			<h2>李少天管理系统</h2>
			<el-form
				:model="ruleForm"
				status-icon
				:rules="rules"
				ref="ruleForm"
				class="demo-ruleForm"
			>
				<el-form-item prop="account">
					<el-input
						prefix-icon="el-icon-user-solid"
						v-model.number="ruleForm.account"
					></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input
						prefix-icon="el-icon-s-order"
						type="password"
						v-model="ruleForm.password"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm">提交</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Login } from '@/apis/user'

export default {
	mounted() {
		this.enterLogin = (e) => {
			if (e.key == 'Enter') {
				// 兼容数字键盘回车
				this.Login(this.ruleForm)
			}
			console.log(e, '-----')
		}
		window.addEventListener('keypress', this.enterLogin)
	},
	beforeDestroy() {
		window.removeEventListener('keypress', this.enterLogin)
	},
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'))
			} else if (value.length < 6) {
				callback(new Error('请输入大于6位数密码'))
			} else {
				callback()
			}
		}
		return {
			ruleForm: {
				account: 'admin',
				password: 'approve123456.',
			},
			rules: {
				account: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
				pass: [{ validator: validatePass, trigger: 'blur' }],
			},
		}
	},
	methods: {
		...mapMutations({
			isLogin: 'user/changeIsLogin',
			userInfo: 'user/changeUserInfo',
		}),

		async Login({ account, password }) {
			let params = {
				account,
				password,
			}
			let [res, err] = await Login(params)
			if (err) {
				this.$message.error(err.message)
			}
			if (res?.token) {
				this.isLogin(true)
				this.userInfo({
					username: account,
				})
				console.log(this.$route.query.redirect, 'this.$route.query.redirect')
				this.$router.push(this.$route.query.redirect || '/')
			}
		},
		submitForm() {
			this.$refs.ruleForm.validate((valid) => {
				if (valid) {
					this.Login(this.ruleForm)
				} else {
					this.$message.error('验证失败')
					return false
				}
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.login-box {
	height: 100%;
	background-image: url('../assets/bg2.jpg');
	background-size: cover;
}
.login-input-box {
	width: 650px;
	height: 320px;
	background: #fff;
	text-align: center;
	padding: 40px 40px 12px 12px;
}
::v-deep .el-input__inner {
	background: #f5f5f5;
}
.el-input {
	width: 600px;
	margin-bottom: 12px;
}
.el-button {
	width: 600px;
}
</style>
