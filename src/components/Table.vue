<script>
import ColumnMixins from './ColumnMixins.vue'
export default {
	name: 'Table',
	// mixins: [ColumnMixins],
	data() {
		return {
			initialOptions: {
				stripe: true, // 是否为斑马纹 table
				border: false, // 是否带有纵向边框
				fit: true, // 列宽度撑开,
				showHeader: true, // 显示表头
				rowKey: 'id',
				useIndex: true, // 行索引
				useMultiSelect: false, // 是否多选
				// multiSelect:true, // 第一列复选框
				// index:true, // 第一列是行号
			},
			pageInitialOptions: {
				currentPage: 1,
				pageSizes: [10, 20, 30, 40],
				pageSize: 10,
				total: 0,
			},
		}
	},
	props: {
		loadingTag: {
			type: String,
		},
		options: {
			type: Object,
			default() {
				return this.initialOptions
			},
		},
		pageOptions: {
			type: Object,
			default() {
				return this.pageInitialOptions
			},
		},
		data: {
			type: Array,
			default: () => [],
		},
		columns: {
			type: Array,
			default: () => [],
		},
		showPagination: {
			type: Boolean,
			default: () => true,
		},
	},

	created() {},

	computed: {
		// 监听外部属性是否改变默认属性 替换默认属性
		listeningOptions() {
			return Object.assign({}, this.initialOptions, this.options)
		},
		pageListeningOptions() {
			return Object.assign({}, this.pageInitialOptions, this.pageOptions)
		},
	},

	methods: {
		renderTable() {
			const {
				loadingTag,
				listeningOptions,
				data,
				columns,
				$store: {
					state: { loadings },
				},
			} = this
			let { useIndex } = listeningOptions
			let { useMultiSelect } = listeningOptions
			// 自定义指令
			const directives = [
				{
					name: 'loading',
					modifiters: { box: true },
					value: loadings[loadingTag],
				},
				{
					name: 'drag',
				},
			]
			return (
				<el-table
					id="box"
					{...{ directives }}
					data={data}
					attrs={listeningOptions}
					onSelection-change={(e) => this.$emit('selection-change', e)}
				>
					{useMultiSelect && this.renderMultiSelect()}
					{useIndex && this.renderIndex()}
					{/* this.renderColumn(columns) */}
					{columns.map((col) => (
						<Column scopedSlots={this.$scopedSlots} columns={col} />
					))}
				</el-table>
			)
		},

		// 首列
		renderIndex() {
			return (
				<el-table-column
					width="55"
					label="序号"
					type="index"
					align="center"
				></el-table-column>
			)
		},
		// 多选
		renderMultiSelect() {
			return (
				<el-table-column
					type="selection"
					reserve-selection={true}
					width="55"
				></el-table-column>
			)
		},

		renderPagination() {
			const { pageListeningOptions } = this
			return (
				<el-pagination
					attrs={pageListeningOptions}
					onSize-change={(e) => this.$emit('size-change', e)}
					onCurrent-change={this.handleCurrentChange}
					layout="total, sizes, prev, pager, next, jumper"
				></el-pagination>
			)
		},
		handleCurrentChange(page) {
			this.$emit('handleCurrentChange', page)
		},
	},

	render() {
		return (
			<div>
				{this.renderTable()}
				{this.showPagination && this.renderPagination()}
			</div>
		)
	},
}
</script>

<style></style>
