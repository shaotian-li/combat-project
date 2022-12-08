<script>
export default {
	name: 'Column',
	props: {
		columns: {
			type: Object,
			required: true,
		},
	},
	render() {
		return this.renderTabelCol(this.columns)
	},
	methods: {
		renderTabelCol(col) {
			// 判断是否需要slot
			// $slot  和          $scopedSlots 区别
			// 纯使用外部传递       根据外部插槽调用方法传递给外部
			// console.log('xxxx', this.$scopedSlots[col.slot],this.$slots[col.slot])

			// 可以根据字符串传递html的结构内容生成出来
			let scopedSlots
			if (col.formatter) {
				scopedSlots = {
					default: (prop) => {
						// 大部分用attrs, 特殊属性使用domProps
						return <div domPropsInnerHTML={col.formatter(prop)}></div>
					},
				}
			}

			return col.slot
				? this.$scopedSlots[col.slot](col)
				: !col.isHide && (
						<el-table-column
							prop={col.prop}
							label={col.label}
							width={col.width}
							scopedSlots={scopedSlots}
						>
							{col.children &&
								col.children.length > 0 &&
								this.renderTableColumn(col.children)}
						</el-table-column>
				  )
		},
		// 渲染固定列
		renderTableColumn(columns) {
			// 动态渲染列
			return columns.map((col, i) => {
				return this.renderTabelCol(col, i)
			})
		},
	},
}
</script>

<style></style>
