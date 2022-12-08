export const sexOptions = [
	{ value: 'man', label: '男' },
	{ value: 'woman', label: '女' },
]

export default {
	options: {
		// height: 600,
		loading: true,
		useIndex: true,
		useMultiSelect: true,
	},
	pageOptions: {
		pageSize: 10,
		total: 0,
		currentPage: 1,
		pageSizes: [10, 20, 30, 40],
	},
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
		{
			label: '性别',
			prop: 'sex',
		},
		{
			label: '教育程度',
			prop: 'education',
		},
		{
			label: '居住地址',
			prop: 'address1',
		},
		{
			label: '申请状态',
			prop: 'status',
			slot: 'status',
		},
		{
			label: '手机号',
			prop: 'mobile_phone',
			isHide: false,
		},

		{
			label: '操作',
			width: 300,
			prop: 'opts',
			slot: 'opts',
		},
		{
			label: '配送信息',
			children: [
				{
					label: '地址',
					children: [
						{ label: '省份', prop: 'address1' },
						{ label: '市区' },
						{ label: '地址' },
					],
				},
			],
		},
		{
			label: '自定义html',
			formatter: function (prop) {
				return `<div>
          <h2>${prop.row.address1}</h2>
        </div>`
			},
		},
	],
}
