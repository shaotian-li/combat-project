<template>
	<el-container>
		<el-aside width="220px">
			<el-menu
				router
				default-active="2"
				class="el-menu-vertical-demo"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b"
			>
				<AsideMenu v-for="(item, i) in menus" :key="i" :item="item" />
			</el-menu>
		</el-aside>
		<el-container>
			<el-header>
				<div class="left">
					<Breadcrumb />
				</div>
				<div class="right">
					<Dropdown :title="'admin'" @command="command" :data="items" />
				</div>
			</el-header>
			<el-main>
				<router-view />
			</el-main>
			<el-footer>Footer</el-footer>
		</el-container>
	</el-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	data() {
		return {
			items: [{ label: '退出', key: 'logout' }],
		}
	},
	computed: {
		...mapGetters({
			menus: 'user/getUserMenus',
		}),
	},

	methods: {
		...mapActions({
			logout: 'user/doLogout',
		}),
		async command(e) {
			if (e === 'logout') {
				let [res, err] = await this.logout()
				window.location.reload()
			}
		},
	},
}
</script>

<style scoped>
.el-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.el-footer {
	background-color: #b3c0d1;
	color: #333;
	text-align: center;
	line-height: 60px;
}

.el-aside {
	background-color: #545c64;
	color: #333;
	text-align: center;
	line-height: 200px;
}

.el-main {
	background-color: #e9eef3;
	color: #333;
	text-align: center;
}

body > .el-container {
	margin-bottom: 40px;
}
.el-container {
	height: 100%;
}
.el-menu-vertical-demo {
	border: none;
}
</style>
