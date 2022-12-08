<script>
export default {
	methods: {
		// 渲染固定列
		renderColumn(columns) {
			// 动态渲染列
			return columns.map((col, i) => {
				return this.renderCol(col, i)
			})
		},
		renderCol(col, index) {
			// 判断是否需要slot
			// $slot  和          $scopedSlots 区别
			// 纯使用外部传递       根据外部插槽调用方法传递给外部
			// console.log('xxxx', this.$scopedSlots[col.slot],this.$slots[col.slot])
			return col.slot
				? this.$scopedSlots[col.slot](col)
				: !col.isHide && (
						<el-table-column
							prop={col.prop}
							label={col.label}
							width={col.width}
						>
							{col.children &&
								col.children.length > 0 &&
								this.renderColumn(col.children)}
						</el-table-column>
				  )
		},
	},
}
</script>
