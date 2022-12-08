export default Object.freeze({
	options: {
		useIndex: false,
		useMultiSelect: false,
	}, // table属性
	columns: [
		{
			label: '姓名',
			prop: 'name',
			// width:"20"
		},
		{
			label: '出生日期',
			prop: 'birthday',
			slot: 'birthday',
		},
		{ label: '身份证', prop: 'identity_card' },
		{
			label: '操作',
			width: 300,
			prop: 'opts',
			slot: 'opts',
		},
	], // column的配置
})
