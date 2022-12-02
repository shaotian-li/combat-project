import Vue from 'vue'
import Vuex from 'vuex'

// 动态引入modules下面的文件
const modulesFn = require.context('./modules', true, /\.js$/)
const regex = /.*\/(.*)\.js$/
const modules = {}

// modulesFn.keys() 可以获取到上面modulesFn 加载路径

modulesFn.keys().forEach((filepath) => {
	let moduleName = regex.exec(filepath)
	if (moduleName !== null) {
		moduleName = moduleName[1]
	}
	const moduleObj = modulesFn(filepath)
	modules[moduleName] = {
		namespaced: true, // 带命名空间的模块
		...moduleObj.default,
	}
})

Vue.use(Vuex)

export default new Vuex.Store({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: modules,
})
