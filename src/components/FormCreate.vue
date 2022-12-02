<script>
export default {
	name: 'FormCreate',
	props: {
		conf: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			form: {},
		}
	},

	created() {
		const { items, rules, cards } = this.conf
		if (rules) {
			this.rulesHandler(rules)
		}
		if (items) {
			this.reactiveFileds(items)
		} else if (cards) {
			cards.map((item) => {
				if (item.children) {
					this.reactiveFileds(item.children)
				}
			})
		}
	},

	methods: {
		reactiveFileds(items) {
			items.forEach((itemArr) => {
				itemArr.forEach((item) => {
					this.$set(this.form, item.key, item.value)
				})
			})
		},
		rulesHandler(rules) {
			// 改变自定义验证器的this指向（自定义验证器不能使用箭头函数）
			for (const key in rules) {
				if (Object.hasOwnProperty.call(rules, key)) {
					let valArr = rules[key]
					valArr.forEach((item) => {
						if (item.validator) {
							item.validator = item.validator.bind(this)
						}
					})
				}
			}
		},
		deepClone(data) {
			return JSON.parse(JSON.stringify(data))
		},
		// 传递
		passSubmit() {
			return this.deepClone(this.form)
		},
		validate(fn) {
			// 做验证
			this.$refs.form.validate((valid) => {
				console.log(valid, this.form)
				if (valid) {
					fn(this.passSubmit())
				} else {
					fn(false)
				}
			})
		},

		// 默认
		doSumbit() {
			const { submit } = this.$listeners
			this.validate(submit)
			// this.$emit('submit', this.deepClone(this.form))
		},
		reset() {
			this.$refs.form.resetFields()
		},

		renderItem(item) {
			switch (item.type) {
				case 'input':
				case 'password':
				case 'textarea':
					return (
						<el-input
							placeholder={`请输入${item.label}`}
							v-model={this.form[item.key]}
							type={item.type}
						></el-input>
					)
				case 'radio':
					return item.options.map((opt, i) => {
						return (
							<el-radio v-model={this.form[item.key]} key={i} label={opt.label}>
								{opt.text}
							</el-radio>
						)
					})
				case 'select':
					return (
						<el-select v-model={this.form[item.key]} attrs={item.attrs}>
							{item.options.map((opt) => {
								return (
									<el-option
										key={opt.value}
										label={opt.label}
										value={opt.value}
									></el-option>
								)
							})}
						</el-select>
					)
				case 'datetime':
					return (
						<el-date-picker
							v-model={this.form[item.key]}
							type="date"
							attrs={item.attrs}
						></el-date-picker>
					)
			}
		},
		renderColumns(columns) {
			return columns.map((item) => {
				return (
					<el-col xl={item.colspan} lg={item.colspan} md={12} sm={24} xs={24}>
						<el-form-item label={item.label} prop={item.key}>
							{this.renderItem(item)}
						</el-form-item>
					</el-col>
				)
			})
		},
		renderRows(rows) {
			return rows.map((rowArr) => {
				return <el-row>{this.renderColumns(rowArr)}</el-row>
			})
		},

		renderCards(cards) {
			return cards.map((card) => {
				return (
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<span>{card.name}</span>
						</div>
						{card.children && this.renderRows(card.children)}
					</el-card>
				)
			})
		},
	},
	render(h) {
		const { title, items, rules, cards } = this.conf
		const { form } = this
		return (
			<div class="form-box">
				<h1>{title}</h1>
				{/* jsx不能直接传递model */}
				<el-form
					ref="form"
					attrs={{ model: form }}
					rules={rules}
					label-width="80px"
				>
					{cards ? this.renderCards(cards) : this.renderRows(items)}
				</el-form>
				<div class="btns">
					{this.$slots.default ? (
						this.$slots.default
					) : (
						<div>
							<el-button
								type="primary"
								onClick={() => {
									this.doSumbit()
								}}
							>
								提交
							</el-button>
							<el-button onClick={this.reset}>取消</el-button>
						</div>
					)}
				</div>
			</div>
		)
	},
}
</script>

<style lang="scss" scoped>
.box-card {
	text-align: left;
	margin-bottom: 10px;
}
.el-input {
	width: 80%;
}
.el-select {
	width: 80%;
}
</style>
