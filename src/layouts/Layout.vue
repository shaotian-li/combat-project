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
				<div class="tags-box">
					<el-tag
						@click="$router.push({ name: t.compName })"
						@close="delTag(t)"
						closable
						v-for="(t, i) in tags"
						:key="i"
						>{{ t.title }}</el-tag
					>
				</div>
				<transition name="fade" mode="out-in">
					<keep-alive :max="40" :include="getTagsCompName">
						<router-view />
					</keep-alive>
				</transition>
			</el-main>
			<el-footer>Footer</el-footer>
		</el-container>
	</el-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
	data() {
		return {
			items: [{ label: '退出', key: 'logout' }],
		}
	},
	computed: {
		...mapGetters({
			menus: 'user/getUserMenus',
			tags: 'user/getTags',
		}),
		getTagsCompName() {
			return this.tags.map((e) => e.compName)
		},
	},

	methods: {
		...mapActions({
			logout: 'user/doLogout',
		}),
		...mapMutations({
			delTag: 'user/delTag',
		}),
		async command(e) {
			if (e === 'logout') {
				await this.logout()
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
.tags-box {
	margin-bottom: 10px;
	text-align: left;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}
</style>
