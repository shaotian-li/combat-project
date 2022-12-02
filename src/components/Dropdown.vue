<template>
	<el-dropdown @command="$emit('command', $event)">
		<span class="el-dropdown-link">
			{{ title }}<i class="el-icon-arrow-down el-icon--right"></i>
		</span>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item
				v-for="(item, i) in data"
				:key="i"
				:command="item.key"
				>{{ item.label }}</el-dropdown-item
			>
		</el-dropdown-menu>
	</el-dropdown>
</template>

<script>
export default {
	name: 'Dropdown',
	props: {
		title: {
			type: String,
			required: true,
		},
		data: {
			type: Array,
			required: true,
		},
	},
}
</script>

<style></style>
