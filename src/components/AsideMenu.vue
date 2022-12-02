<template>
	<el-menu-item v-if="!item.children" :index="item.path">
		<!-- <i class="el-icon-document"></i> -->
		<span slot="title">{{ item.meta.title }}</span>
	</el-menu-item>
	<el-submenu v-else :index="item.path">
		<template #title>{{ item.meta.title }}</template>
		<AsideMenu v-for="(it, i) in item.children" :key="i" :item="it" />
	</el-submenu>
</template>

<script>
export default {
	name: 'AsideMenu',
	props: {
		item: {
			type: Object,
			required: true,
		},
	},
}
</script>

<style></style>
