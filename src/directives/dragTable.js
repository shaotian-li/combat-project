export default {
	// 自定义的  和外部交互
	name: 'drag',
	handler: {
		unbind: function (el) {
			let target = el.getElementsByClassName('el-table__body-wrapper')[0]
			target.onmousedown = null
		},
		// 元素  修饰符与数据  虚拟node
		inserted: function (el, binding, vnode) {
			let target = el.getElementsByClassName('el-table__body-wrapper')[0]
			target.style.overflowX = 'hidden'
			target.style.cursor = 'grab'

			// 鼠标按下 clientX的x数值
			target.onmousedown = function (event) {
				// 记录鼠标初始值
				let startPointX = event.clientX
				// 获取scrollleft值
				let startScrollLeft = target.scrollLeft
				// 记录鼠标移动
				document.onmousemove = function (e) {
					// 移动到的 位置 - 初始点的位置
					let x = e.clientX - startPointX
					target.scrollLeft = startScrollLeft - x
					// console.log('移动的位置:', e.clientX)
				}
				document.onmouseup = function () {
					document.onmouseup = null
					document.onmousemove = null
				}
			}
		},
	},
}
